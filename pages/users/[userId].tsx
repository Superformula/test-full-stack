import { withSSRContext } from 'aws-amplify'
import { GraphQLResult } from '@aws-amplify/api'
import { useEffect, ReactElement } from 'react'
import { GetStaticProps, GetStaticPaths } from 'next'
import Head from 'next/head'
import { useRouter } from 'next/router'

import Modal from '../../components/generic/Modal'
import Loader from '../../components/generic/Loader'
import UserForm from '../../components/User/UserForm'

import callGraphQL from '../../models/graphql-api'
import {
  GetUserQuery,
  GetUserQueryVariables,
  ListUsersQuery,
  ListUsersQueryVariables
} from '../../API'
import { getUser, listUsers } from '../../graphql/queries'
import User, { handleUpdateUser, UserEdit } from '../../models/user'
import { DEFAULT_PAGE_SIZE } from '../../config/constants'
import { parsePageQueryParam } from '../../utils/helpers'
import { useModal } from '../../hooks/useModal'

import { AppContext } from '../../interfaces'

import styles from '../../styles/Home.module.css'

interface Props {
  user: User;
  context: AppContext;
}

const UserPage = ({ user, context: { dispatch } }: Props): ReactElement => {
  const router = useRouter()
  const { toggleModal } = useModal()
  const pageQueryParam = parsePageQueryParam(router.query)
  const redirectPath = pageQueryParam ? `/?page=${pageQueryParam}` : '/'

  useEffect(() => {
    router.prefetch('/')
  }, []) // eslint-disable-line react-hooks/exhaustive-deps

  if (router.isFallback) {
    return <Loader />
  }

  const toggleModuleWithRouteHandler = async (): Promise<void> => {
    await router.push(redirectPath)
    toggleModal()
  }

  const onUpdateUser = (data: UserEdit): void => {
    toggleModuleWithRouteHandler()
    handleUpdateUser(dispatch, data)
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
          onHide={toggleModuleWithRouteHandler}
          title="Edit user"
        >
          <UserForm
            user={user}
            action="update"
            onUpdateUser={onUpdateUser}
            onCancelUpdateUser={toggleModuleWithRouteHandler}
          />
        </Modal>
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
    const { API } = withSSRContext()

    try {
      result = await callGraphQL<ListUsersQuery>(
        listUsers,
        {
          limit: DEFAULT_PAGE_SIZE
        } as ListUsersQueryVariables,
        API
      )
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
    const { API } = withSSRContext()

    try {
      result = await callGraphQL<GetUserQuery>(
        getUser,
        {
          id: userId
        } as GetUserQueryVariables,
        API
      )
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
