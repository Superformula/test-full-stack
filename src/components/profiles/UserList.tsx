import * as React from 'react'
import { useQuery } from '@apollo/react-hooks'
import LIST_USER_QUERY from './ListUsers.graphql'
import { ListUsers } from './__generated__/ListUsers'

export const UserList = () => {
  const { loading, error, data } = useQuery<ListUsers>(LIST_USER_QUERY)

  if (loading) return 'Loading...'
  if (error) return `Error! ${error.message}`
  if (data?.users?.edges) {
    return (
      <ul>
        {data.users.edges.map((edge) => (
          <li key={edge!.node!.id}>{edge!.node!.name}</li>
        ))}
      </ul>
    )
  } else {
    return <div></div>
  }
}
