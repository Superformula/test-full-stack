import { useEffect, ReactElement } from 'react'
import Head from 'next/head'
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
  const { isOpen, toggleModal } = useModal()
  const { title: appTitle } = siteMetadata
  const pageQueryParam = parsePageQueryParam(router.query)
  const redirectPath = pageQueryParam ? `/?page=${pageQueryParam}` : '/'
  const hasMoreUsers = users && Boolean(nextToken)
  const shouldOpenModal = isOpen && Boolean(router.query.userId)

  // Populate users upon retrieval from server
  useEffect(() => {
    dispatch({ type: HYDRATE_USERS, payload: users })
  }, []) // eslint-disable-line react-hooks/exhaustive-deps

  useEffect(() => {
    if (router.query.userId) {
      toggleModal()
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

  const toggleModuleWithRouteHandler = async (): Promise<void> => {
    await router.push(redirectPath)
    toggleModal()
  }

  const onCreateUser = (data: UserCreate): void => {
    handleCreateUser(dispatch, data, pageQueryParam)
    scrollTo({ top: 0, behavior: 'smooth' })
  }

  const onUpdateUser = (data: UserEdit): void => {
    toggleModuleWithRouteHandler()
    handleUpdateUser(dispatch, data)
  }

  return (
    <div className={styles.container}>
      <Modal
        isOpen={shouldOpenModal}
        onHide={toggleModuleWithRouteHandler}
        title="Edit user"
      >
        <UserForm
          user={state.users.find(user => router.query.userId === user.id)}
          action="update"
          onUpdateUser={onUpdateUser}
          onCancelUpdateUser={toggleModuleWithRouteHandler}
        />
      </Modal>

      <Head>
        <title>{appTitle} app</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <main className={styles.main}>
        <div className={styles.header}>
          <h1 className={styles.title}>{appTitle}</h1>
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

        {/* TODO: Find a more suitable UX pattern for a New Form. Most likely, move this over to a modal form. */}
        <div className={styles.card}>
          <h3 className={styles.title}>New User</h3>
          <UserForm onCreateUser={onCreateUser} />
        </div>
      </main>
    </div>
  )
}

export const getServerSideProps: GetServerSideProps = ({ query }) => {
  async function fetchUsers(): Promise<{
    props: { users: ListUsersType, nextToken?: string };
  }> {
    let result: GraphQLResult<ListUsersQuery>
    const pageQueryParam = parsePageQueryParam(query)

    try {
      result = await callGraphQL<ListUsersQuery>(listUsers, {
        limit: DEFAULT_PAGE_SIZE * pageQueryParam
      } as ListUsersQueryVariables)
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
