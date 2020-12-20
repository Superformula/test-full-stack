import { InMemoryCache, IntrospectionFragmentMatcher } from 'apollo-cache-inmemory'
import { setContext } from 'apollo-link-context'

import { ApolloClient as AC } from 'apollo-client'
import { HttpLink } from 'apollo-link-http'

const fragmentMatcher = new IntrospectionFragmentMatcher({
  introspectionQueryResultData: {
    __schema: {
      types: [],
    },
  },
})

const getLink = () => {
  return authLink.concat(
    new HttpLink({
      uri: `http://0.0.0.0:8000/graphql`,
      headers: {
        authorization: `Bearer ${sessionStorage.getItem('authToken')}`,
      },
    }),
  )
}
const authLink = setContext((_, { headers }) => {
  const token = sessionStorage.getItem('authToken')
  return {
    headers: {
      ...headers,
      authorization: token ? `Bearer ${token}` : '',
    },
  }
})

export const client = new AC({
  link: getLink(),
  cache: new InMemoryCache({
    fragmentMatcher,
  }),
})
