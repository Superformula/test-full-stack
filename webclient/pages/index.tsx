import { useState, useEffect, ReactElement, ChangeEvent } from 'react'
import Head from 'next/head'
import { GraphQLResult } from '@aws-amplify/api'
import { GetStaticProps } from 'next'
import Modal from 'react-modal'
import { useRouter } from 'next/router'

import UserGrid from '../components/Users/UserGrid'
import UserForm from '../components/Users/UserForm'
import SearchBox from '../components/generic/SearchBox'

import { ListUsersQuery } from '../API'
import { listUsers } from '../graphql/queries'
import callGraphQL from '../models/graphql-api'
import User from '../models/user'
import { siteMetadata } from '../config/constants'
import { HYDRATE_USERS } from '../config/ActionTypes'

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
  const [searchTerm, setSearchTerm] = useState('')
  const router = useRouter()
  const { title: appTitle } = siteMetadata

  // Populate users upon retrieval from server
  useEffect(() => {
    dispatch({ type: HYDRATE_USERS, payload: users })
  }, []) // eslint-disable-line react-hooks/exhaustive-deps

  // TODO: implement loading state by checking incoming 'users'

  const handleSearchTermChange = (event: ChangeEvent<HTMLInputElement>): void =>
    setSearchTerm(event.target.value)

  return (
    <div className={styles.container}>
      <Modal
        isOpen={Boolean(router.query.userId)}
        onRequestClose={(): Promise<boolean> => router.push('/')}
        contentLabel="User modal"
      >
        <UserForm
          user={state.users.find(u => router.query.userId === u.id)}
          dispatch={dispatch}
          action="update"
        />
      </Modal>

      <Head>
        <title>{appTitle} app</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <main className={styles.main}>
        <div className={styles.header}>
          <h1 className={styles.title}>{appTitle}</h1>

          <SearchBox
            value={searchTerm}
            onSearchTermChange={handleSearchTermChange}
          />
        </div>

        <UserGrid users={state.users} dispatch={dispatch} />

        <div className={styles.card}>
          <h3 className={styles.title}>New User</h3>

          <UserForm dispatch={dispatch} action="create" />
        </div>
      </main>
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
