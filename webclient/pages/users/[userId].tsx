import { GraphQLResult } from '@aws-amplify/api'
import { useEffect, ReactElement } from 'react'
import { GetStaticProps, GetStaticPaths } from 'next'
import Head from 'next/head'
import { useRouter } from 'next/router'
import Modal from 'react-modal'

import UserCard from '../../components/UserCard'

import callGraphQL from '../../models/graphql-api'
import { GetUserQuery, GetUserQueryVariables, ListUsersQuery } from '../../API'
import { getUser, listUsers } from '../../graphql/queries'
import User from '../../models/user'

import { AppContext } from '../../interfaces'

import styles from '../../styles/Home.module.css'

interface Props {
  user: User;
  context: AppContext;
}

// TODO: rework modal with custom solution
Modal.setAppElement('#__next')

const UserPage = ({ user, context: { dispatch } }: Props): ReactElement => {
  const router = useRouter()

  useEffect(() => {
    router.prefetch('/')
  }, []) // eslint-disable-line react-hooks/exhaustive-deps

  if (router.isFallback) {
    return (
      <div className={styles.container}>
        <h1 className={styles.title}>Loading user&hellip;</h1>
      </div>
    )
  }

  return (
    <div className={styles.container}>
      <Head>
        <title>{user.name}</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <main className={styles.main}>
        <Modal
          isOpen={true} // The modal should always be shown on page load
          onRequestClose={(): Promise<boolean> => router.push('/')}
          contentLabel="User modal"
        >
          <UserCard data={user} dispatch={dispatch} />
        </Modal>
        <h1 className={styles.title}>{user.name}</h1>

        <pre className={styles.description}>
          {JSON.stringify(user, null, 2)}
        </pre>
      </main>
    </div>
  )
}

export const getStaticPaths: GetStaticPaths = () => {
  async function fetchUsersPaths(): Promise<{
    paths: {
      params: {
        userId: string;
      };
    }[];
    fallback: boolean;
  }> {
    let result: GraphQLResult<ListUsersQuery>

    try {
      result = await callGraphQL<ListUsersQuery>(listUsers)
    } catch ({ errors }) {
      console.error(errors)
    }

    const { data, errors } = result

    if (errors) {
      console.error('Failed to fetch users paths', errors)
      return {
        paths: [],
        fallback: false
      }
    }

    const paths = data.listUsers.items.map(({ id }) => ({
      params: { userId: id }
    }))

    return {
      paths,
      fallback: true
    }
  }

  return fetchUsersPaths()
}

export const getStaticProps: GetStaticProps = ({ params: { userId } }) => {
  async function fetchUser(): Promise<{
    props: {
      user: User;
    };
  }> {
    let result: GraphQLResult<GetUserQuery>

    try {
      result = await callGraphQL<GetUserQuery>(getUser, {
        id: userId
      } as GetUserQueryVariables)
    } catch ({ errors }) {
      console.error(errors)
    }

    const { data, errors } = result

    if (errors) {
      console.error('Failed to fetch a user', errors)
      return {
        props: {
          user: null
        }
      }
    }

    return {
      props: {
        user: data.getUser
      }
    }
  }

  return fetchUser()
}

export default UserPage
