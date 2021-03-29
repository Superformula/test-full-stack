import { useEffect, ReactElement } from 'react'
import Head from 'next/head'
import { GraphQLResult } from '@aws-amplify/api'
import { GetStaticProps } from 'next'
import Modal from 'react-modal'
import { useRouter } from 'next/router'
import Link from 'next/Link'

import UserForm from '../components/UserForm'
import UserCard from '../components/UserCard'

import { ListUsersQuery } from '../API'
import { listUsers } from '../graphql/queries'
import callGraphQL from '../models/graphql-api'
import User, { handleDeleteUser } from '../models/user'
import { HYDRATE_USERS } from '../constants/ActionTypes'

import { AppContext } from '../interfaces'

import styles from '../styles/Home.module.css'

interface Props {
  users: User[];
  context: AppContext;
}

type ListUsersType = ListUsersQuery['listUsers']['items']

// TODO: rework modal with custom solution
Modal.setAppElement('#__next')

export default function App({
  users,
  context: { state, dispatch }
}: Props): ReactElement {
  const router = useRouter()

  // Populate users upon retrieval from server
  useEffect(() => {
    dispatch({ type: HYDRATE_USERS, payload: users })
  }, []) // eslint-disable-line react-hooks/exhaustive-deps

  // TODO: implement loading state by checking incoming 'users'

  return (
    <div className={styles.container}>
      <Modal
        isOpen={Boolean(router.query.userId)}
        onRequestClose={(): Promise<boolean> => router.push('/')}
        contentLabel="User modal"
      >
        <UserCard
          dispatch={dispatch}
          data={state.users.find(u => router.query.userId === u.id)}
        />
      </Modal>

      <Head>
        <title>Users list app</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <main className={styles.main}>
        <h1 className={styles.title}>Users list</h1>

        <p className={styles.description}>
          <code className={styles.code}>{state.users.length}</code>
          users
        </p>

        <div className={styles.grid}>
          {state.users.map(user => (
            <div className={styles.card} key={user.id}>
              <Link as={`/users/${user.id}`} href={`/?userId=${user.id}`}>
                <h3>{user.name}</h3>
              </Link>
              <p>{user.description}</p>
              <button
                type="button"
                onClick={(): Promise<void> =>
                  handleDeleteUser(dispatch, user.id)
                }
              >
                delete user
              </button>
            </div>
          ))}

          <div className={styles.card}>
            <h3 className={styles.title}>New User</h3>

            <UserForm dispatch={dispatch} action="create" />
          </div>
        </div>
      </main>

      <footer className={styles.footer}>Users list © 2021</footer>
    </div>
  )
}

export const getStaticProps: GetStaticProps = () => {
  async function fetchUsers(): Promise<{
    props: { users: ListUsersType };
  }> {
    let result: GraphQLResult<ListUsersQuery>

    try {
      result = await callGraphQL<ListUsersQuery>(listUsers)
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
        users: result.data.listUsers.items
      }
    }
  }

  return fetchUsers()
}
