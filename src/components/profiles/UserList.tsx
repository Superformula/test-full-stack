import * as React from 'react'
import { useQuery } from '@apollo/react-hooks'
import LIST_USER_QUERY from './ListUsers.graphql'

export const UserList = () => {
  const { loading, error, data } = useQuery(LIST_USER_QUERY)

  if (loading) return 'Loading...'
  if (error) return `Error! ${error.message}`
  console.log(data)
  return <div>Profiles</div>
}
