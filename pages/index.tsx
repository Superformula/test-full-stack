import { useEffect, ReactElement } from 'react'
import Head from 'next/head'
import { withSSRContext } from 'aws-amplify'
import { GraphQLResult } from '@aws-amplify/api'
import { GetServerSideProps } from 'next'
import { useRouter } from 'next/router'
import Link from 'next/link'

import Loader from '../components/generic/Loader'
import Button from '../components/generic/Button'
import Modal from '../components/generic/Modal'
import LinkFunctionalChildWrapper from '../components/generic/LinkFunctionalChildWrapper'
import UserGrid from '../components/User/UserGrid'
import UserForm from '../components/User/UserForm'
import UserSearch from '../components/User/UserSearch'

import { ListUsersQuery, ListUsersQueryVariables } from '../API'
import { listUsers } from '../graphql/queries'
import callGraphQL from '../models/graphql-api'
import User, {
  handleLoadMoreUsers,
  handleCreateUser,
  handleUpdateUser,
  UserEdit,
  UserCreate
} from '../models/user'
import { siteMetadata, DEFAULT_PAGE_SIZE } from '../config/constants'
import { parsePageQueryParam } from '../utils/helpers'
import { useModal } from '../hooks/useModal'
import { HYDRATE_USERS } from '../config/ActionTypes'

import { AppContext } from '../interfaces'

import styles from '../styles/Home.module.css'

interface Props {
  users: User[];
  context: AppContext;
  nextToken?: string;
}

type ListUsersType = ListUsersQuery['listUsers']['items']

export default function App({
  users,
  context: { state, dispatch },
  nextToken
}: Props): ReactElement {
  const router = useRouter()
  const {
    isOpen: isEditUserModalOpen,
    toggleModal: toggleEditUserModal
  } = useModal()
  const {
    isOpen: isNewUserModalOpen,
    toggleModal: toggleNewUserModal
  } = useModal()
  const { title: appTitle } = siteMetadata
  const pageQueryParam = parsePageQueryParam(router.query)
  const redirectPath = pageQueryParam ? `/?page=${pageQueryParam}` : '/'
  const hasMoreUsers = users && Boolean(nextToken)
  const shouldOpenEditUserModal =
    isEditUserModalOpen && Boolean(router.query.userId)

  // Populate users upon retrieval from server
  useEffect(() => {
    dispatch({ type: HYDRATE_USERS, payload: users })
  }, []) // eslint-disable-line react-hooks/exhaustive-deps

  useEffect(() => {
    if (router.query.userId) {
      toggleEditUserModal()
    }
  }, [router.query.userId]) // eslint-disable-line react-hooks/exhaustive-deps

  const loadMoreUsers = async (): Promise<void> => {
    await handleLoadMoreUsers(dispatch, nextToken)
    scrollTo({ top: document.body.scrollHeight, behavior: 'smooth' })
  }

  const isLoadingUsers =
    users && (users.length === 0 || state.users.length === 0)

  if (isLoadingUsers) {
    return <Loader />
  }

  const toggleEditUserModalWithRouteHandler = async (): Promise<void> => {
    await router.push(redirectPath)
    toggleEditUserModal()
  }

  const toggleNewUserModalWithRouteHandler = async (): Promise<void> => {
    await router.push(redirectPath)
    toggleNewUserModal()
  }

  const onCreateUser = (data: UserCreate): void => {
    toggleNewUserModalWithRouteHandler()
    handleCreateUser(dispatch, data, pageQueryParam)
  }

  const onUpdateUser = (data: UserEdit): void => {
    toggleEditUserModalWithRouteHandler()
    handleUpdateUser(dispatch, data)
  }

  return (
    <div className={styles.container}>
      <Modal
        isOpen={shouldOpenEditUserModal}
        onHide={toggleEditUserModalWithRouteHandler}
        title="Edit user"
      >
        <UserForm
          user={state.users.find(user => router.query.userId === user.id)}
          action="update"
          onUpdateUser={onUpdateUser}
          onCancelUpdateUser={toggleEditUserModalWithRouteHandler}
        />
      </Modal>

      <Head>
        <title>{appTitle} app</title>
        <link rel="icon" href="/favicon.ico" />
        <link
          href="https://api.mapbox.com/mapbox-gl-js/v2.1.1/mapbox-gl.css"
          rel="stylesheet"
        />
      </Head>

      <main className={styles.main}>
        <div className={styles.header}>
          <h1 className={styles.title}>{appTitle}</h1>
          <div className={styles.newUserButtonWrapper}>
            <Button type="button" onClick={toggleNewUserModal}>
              New User
            </Button>
          </div>
          <UserSearch dispatch={dispatch} />
        </div>

        <UserGrid users={state.users} dispatch={dispatch} />

        {hasMoreUsers && (
          <Link href={`/?page=${pageQueryParam + 1}`} scroll={false}>
            <LinkFunctionalChildWrapper>
              <Button type="button" onClick={loadMoreUsers}>
                Load more
              </Button>
            </LinkFunctionalChildWrapper>
          </Link>
        )}

        <Modal
          isOpen={isNewUserModalOpen}
          onHide={toggleNewUserModalWithRouteHandler}
          title="New user"
        >
          <UserForm onCreateUser={onCreateUser} />
        </Modal>
      </main>
    </div>
  )
}

/**
 * I use `getServerSideProps` because I need to statically pre-render the page
 * whose data must be fetched at request time depending on the URL query param.
 * That is, to support collection data pagination via the `?page` query param/
 * CAUTION: This isn't the most efficient variant as page transitions
 * (which happen in the app when operating the modal), result in
 * `getServerSideProps` running each time a transition happen.
 * With more time at hand, I'd reconsider the loading logic, and likely would
 * use the hybrid approach where I fetch paginated users data on client-side
 * without Next.js doing any pre-rendering. For that, I'll need to run some
 * metrics and measure performance before ding things prematurely.
 */
export const getServerSideProps: GetServerSideProps = ({ req, query }) => {
  async function fetchUsers(): Promise<{
    props: { users: ListUsersType, nextToken?: string };
  }> {
    let result: GraphQLResult<ListUsersQuery>
    const pageQueryParam = parsePageQueryParam(query)
    const { API } = withSSRContext({ req })

    try {
      result = await callGraphQL<ListUsersQuery>(listUsers, {
        limit: DEFAULT_PAGE_SIZE * pageQueryParam
      } as ListUsersQueryVariables, API)
    } catch ({ errors }) {
      console.error(errors)
    }

    if (result.errors) {
      console.error('Failed to fetch a list of users', result.errors)
      return {
        props: {
          users: null
        }
      }
    }

    return {
      props: {
        users: result.data.listUsers.items,
        nextToken: result.data.listUsers.nextToken
      }
    }
  }

  return fetchUsers()
}
