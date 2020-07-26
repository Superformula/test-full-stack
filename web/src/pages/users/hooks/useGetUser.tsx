import { useApolloClient } from '@apollo/react-hooks'
import { useEffect, useMemo, useState } from 'react'
import { GetPersonDocument, Maybe } from '../../../generated/graphql'

export interface CompleteUser {
  id?: string
  name?: string
  avatar?: string
  description?: Maybe<string>
  dob?: string
  lat?: number
  lng?: number
  address?: string
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
        query: GetPersonDocument,
        variables: { id },
      })
      .then((result) => {
        console.log(result.data.person)
        setUser(result.data.person as CompleteUser)
      })
      .finally(() => setLoading(false))
  }, [])

  return useMemo(
    () => ({
      loading,
      user,
    }),
    [loading, user],
  )
}
