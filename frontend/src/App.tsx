import React from 'react';
import './App.css';
import { ApolloProvider } from '@apollo/client';
import UsersPage from './components/UsersPage';
import { buildAppSyncApolloClient } from './api/buildAppSyncApolloClient';

const client = buildAppSyncApolloClient();

const App = (): JSX.Element => (
  <>
    <ApolloProvider client={client}>
      <UsersPage />
    </ApolloProvider>
  </>
);

export default App;
