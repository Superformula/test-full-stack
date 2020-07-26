import { getMainDefinition } from 'apollo-utilities'
import React from 'react'
import { IntlProvider } from 'react-intl'
import style from './App.module.scss'
import { i18n } from './i18n'
import { UsersPage } from './pages/users/UsersPage'

import { ApolloProvider } from '@apollo/react-hooks'
import { InMemoryCache } from 'apollo-cache-inmemory'
import { onError } from 'apollo-link-error'
import { ApolloClient } from 'apollo-client'
import { ApolloLink, split } from 'apollo-link'
import { HttpLink } from 'apollo-link-http'
import { createSubscriptionHandshakeLink } from 'aws-appsync-subscription-link'

const graphQlUri = process.env.REACT_APP_GRAPHQL_URI
const graphQlToken = process.env.REACT_APP_GRAPHQL_TOKEN

interface Store {
  none?: string
}

const httpLink = new HttpLink({
  uri: graphQlUri,
  headers: {
    'X-Api-Key': graphQlToken,
  },
})

const subscriptionLink = createSubscriptionHandshakeLink({
  url: graphQlUri,
  region: process.env.REACT_APP_GRAPHQL_REGION,
  auth: {
    type: 'API_KEY',
    apiKey: graphQlToken,
  },
})

const link = split(
  ({ query }) => {
    const definition = getMainDefinition(query)
    return definition.kind === 'OperationDefinition' && definition.operation === 'subscription'
  },
  subscriptionLink,
  httpLink,
)

const client: ApolloClient<Store> = new ApolloClient({
  link: ApolloLink.from([
    onError(({ graphQLErrors, networkError }) => {
      if (graphQLErrors)
        graphQLErrors.forEach(({ message, locations, path }) =>
          console.log(`[GraphQL error]: Message: ${message}, Location: ${locations}, Path: ${path}`),
        )
      if (networkError) console.log(`[Network error]: ${networkError}`, networkError)
    }),
    link,
  ]),
  cache: new InMemoryCache(),
})

function App() {
  return (
    <ApolloProvider client={client}>
      <IntlProvider locale={i18n.locale} messages={i18n.messages}>
        <header className={style.AppHeader}>
          <UsersPage />
        </header>
      </IntlProvider>
    </ApolloProvider>
  )
}

export default App
