import * as React from 'react'
import { Route, Switch } from 'react-router'
import { ApolloProvider } from '@apollo/react-hooks'
import { hot } from 'react-hot-loader'

import { client } from '@src/gqlClient'
import { UserList } from '@src/components/profiles/UserList'

export const App = hot(module)(() => (
  <ApolloProvider client={client}>
    <Switch>
      <Route path="/" component={UserList} />
    </Switch>
  </ApolloProvider>
))
