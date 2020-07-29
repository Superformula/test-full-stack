import { useCallback, useEffect, useMemo, useRef, useState } from 'react'
import { useApolloClient } from '@apollo/client'
import { ListUsersDocument, Maybe, WatchDeletedUsersDocument, WatchUsersDocument } from '../../../generated/graphql'
import { StringParam, NumberParam, useQueryParam } from 'use-query-params'

export interface User {
  id: string
  name: string
  avatar: string
  description?: Maybe<string>
}

interface Users {
  search: string | null | undefined
  users: User[]
  loading: boolean
  hasMore: boolean
  loadMore: VoidFunction
}

export const useGetUsers = (): Users => {
  const client = useApolloClient()
  const usersInternal = useRef<User[]>([])
  const [loading, setLoading] = useState(false)
  const [users, setUsers] = useState<User[]>([])
  const [nextToken, setNextToken] = useState<string>('')
  const [limit, setLimit] = useQueryParam<number | null | undefined>('limit', NumberParam)
  const [search] = useQueryParam<string | null | undefined>('name', StringParam)
  const hasMore = useMemo(() => !!nextToken, [nextToken])

  const internalSetUsers = useCallback(
    (users: User[]) => {
      usersInternal.current = users
      setUsers(users)
    },
    [usersInternal],
  )

  const loadMore = useCallback(() => {
    if (nextToken) {
      setLoading(true)
      client
        .query({
          fetchPolicy: 'no-cache',
          query: ListUsersDocument,
          variables: { after: nextToken, limit: 6, name: !!search ? search : undefined },
        })
        .then((result) => {
          setLimit((limit ?? 6) + 6, 'replaceIn')
          internalSetUsers(users.concat(result.data.users.list))
          setNextToken(result.data.users.nextToken)
        })
        .finally(() => setLoading(false))
    }
  }, [setLimit, limit, nextToken, client, users, internalSetUsers, search])

  useEffect(() => {
    setLoading(true)
    client
      .query({
        fetchPolicy: 'no-cache',
        query: ListUsersDocument,
        variables: { limit: limit ?? 6, name: !!search ? search : undefined },
      })
      .then((result) => {
        setLoading(false)
        internalSetUsers(result.data.users.list)
        setNextToken(result.data.users.nextToken)
      })

    const deleteSubscription = client
      .subscribe({
        fetchPolicy: 'no-cache',
        query: WatchDeletedUsersDocument,
      })
      .subscribe({
        next(value) {
          if (!value.data.userDeleted) return

          const deleted: User = value.data.userDeleted
          const internalUsers = usersInternal.current
          const oldUserIndex: number = internalUsers.findIndex((user: User) => user.id === deleted.id)
          if (oldUserIndex >= 0) {
            internalSetUsers(internalUsers.filter((user: User) => user.id !== deleted.id))
          }
        },
      })

    const subscription = client
      .subscribe({
        fetchPolicy: 'no-cache',
        query: WatchUsersDocument,
      })
      .subscribe({
        next(value) {
          if (!value.data.userChanged) return

          const internalUsers = usersInternal.current
          const updatedUser: User = value.data.userChanged
          const oldUserIndex: number = internalUsers.findIndex((user: User) => user.id === updatedUser.id)

          if (oldUserIndex >= 0) {
            // replacing item with updated one
            internalSetUsers(
              internalUsers.map((item: User, index: number) => (index === oldUserIndex ? updatedUser : item)),
            )
          } else if (!search) {
            // if search is defined, don't add
            // adding new user to the top of the list
            internalSetUsers([updatedUser].concat(internalUsers))
          }
        },
      })
    return () => {
      subscription.unsubscribe()
      deleteSubscription.unsubscribe()
    }
    // Limit should NOT be on the dependency array
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [search, usersInternal, client, internalSetUsers])

  return useMemo(
    () => ({
      loading,
      users,
      hasMore,
      loadMore,
      search,
    }),
    [loading, users, hasMore, loadMore, search],
  )
}
