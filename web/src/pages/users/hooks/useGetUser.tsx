import { useApolloClient } from '@apollo/react-hooks'
import { useEffect, useMemo, useState } from 'react'
import { GetUserDocument, Maybe } from '../../../generated/graphql'

export interface CompleteUser {
  id: string
  name: string
  avatar: string
  description: Maybe<string>
  dob?: string
  latitude: number
  longitude: number
  address: string
}

export interface GetUserResult {
  user: CompleteUser | null
  loading: boolean
}

export const useGetUser = (id: string): GetUserResult => {
  const client = useApolloClient()
  const [loading, setLoading] = useState(false)
  const [user, setUser] = useState<CompleteUser | null>(null)

  useEffect(() => {
    setLoading(true)
    client
      .query({
        fetchPolicy: 'no-cache',
        query: GetUserDocument,
        variables: { id },
      })
      .then((result) => {
        setUser(result.data.user as CompleteUser)
      })
      .finally(() => setLoading(false))
  }, [client, id])

  return useMemo(
    () => ({
      loading,
      user,
    }),
    [loading, user],
  )
}
