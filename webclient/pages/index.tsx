import { useEffect, ReactElement } from 'react'
import Head from 'next/head'
import { GraphQLResult } from '@aws-amplify/api'
import { GetServerSideProps } from 'next'
import Modal from 'react-modal'
import { useRouter } from 'next/router'
import Link from 'next/link'

import Loader from '../components/generic/Loader'
import Button from '../components/generic/Button'
import LinkFunctionalChildWrapper from '../components/generic/LinkFunctionalChildWrapper'
import UserGrid from '../components/User/UserGrid'
import UserForm from '../components/User/UserForm'
import UserSearch from '../components/User/UserSearch'

import { ListUsersQuery, ListUsersQueryVariables } from '../API'
import { listUsers } from '../graphql/queries'
import callGraphQL from '../models/graphql-api'
import User, { handleLoadMoreUsers } from '../models/user'
import { siteMetadata, DEFAULT_PAGE_SIZE } from '../config/constants'
import { parsePageQueryParam } from '../utils/helpers'
import { HYDRATE_USERS } from '../config/ActionTypes'

import { AppContext } from '../interfaces'

import styles from '../styles/Home.module.css'

interface Props {
  users: User[];
  context: AppContext;
  nextToken?: string;
}

type ListUsersType = ListUsersQuery['listUsers']['items']

// TODO: rework modal with custom solution
Modal.setAppElement('#__next')

export default function App({
  users,
  context: { state, dispatch },
  nextToken
}: Props): ReactElement {
  const router = useRouter()
  const { title: appTitle } = siteMetadata
  const pageQueryParam = parsePageQueryParam(router.query)
  const redirectPath = pageQueryParam ? `/?page=${pageQueryParam}` : '/'
  const hasMoreUsers = users && Boolean(nextToken)

  // Populate users upon retrieval from server
  useEffect(() => {
    dispatch({ type: HYDRATE_USERS, payload: users })
  }, []) // eslint-disable-line react-hooks/exhaustive-deps

  const loadMoreUsers = async (): Promise<void> => {
    await handleLoadMoreUsers(dispatch, nextToken)
    scrollTo({ top: document.body.scrollHeight, behavior: 'smooth' })
  }

  const isLoadingUsers =
    users && (users.length === 0 || state.users.length === 0)

  if (isLoadingUsers) {
    return <Loader />
  }

  return (
    <div className={styles.container}>
      <Modal
        isOpen={Boolean(router.query.userId)}
        onRequestClose={(): Promise<boolean> => router.push(redirectPath)}
        contentLabel="User modal"
      >
        <UserForm
          user={state.users.find(user => router.query.userId === user.id)}
          dispatch={dispatch}
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
          <UserForm dispatch={dispatch} />
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
