import { useQuery } from '@apollo/client'
import { useMemo } from 'react'
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
  const { loading, data } = useQuery(GetUserDocument, {
    fetchPolicy: 'no-cache',
    variables: { id },
  })

  return useMemo(
    () => ({
      loading,
      user: data?.user,
    }),
    [loading, data],
  )
}
