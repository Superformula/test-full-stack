import { getMainDefinition } from 'apollo-utilities'
import { QueryParamProvider } from 'use-query-params'
import { BrowserRouter as Router, Route } from 'react-router-dom'
import React from 'react'
import { IntlProvider } from 'react-intl'
import style from './App.module.scss'
import { i18n } from './i18n'
import { UsersPage } from './pages/users/UsersPage'

import { ApolloProvider, ApolloClient, InMemoryCache, split, HttpLink } from '@apollo/client'
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

  /**
   * Surprisingly AppSync WS connector is running
   * on an OLD (but yet compatible) Apollo client.
   *
   * The reason I did this was just to keep it working,
   * but we need wait until they push a new version supporting
   * Apollo Client 3.
   */
  subscriptionLink as any,
  httpLink,
)

const client: ApolloClient<Store> = new ApolloClient({
  link,
  cache: new InMemoryCache(),
})

function App() {
  return (
    <Router>
      <QueryParamProvider ReactRouterRoute={Route}>
        <ApolloProvider client={client}>
          <IntlProvider locale={i18n.locale} messages={i18n.messages}>
            <header className={style.AppHeader}>
              <Route>
                <UsersPage />
              </Route>
            </header>
          </IntlProvider>
        </ApolloProvider>
      </QueryParamProvider>
    </Router>
  )
}

export default App
