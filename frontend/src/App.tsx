import React from 'react';
import { ApolloProvider } from '@apollo/client';
import styles from './App.module.scss';
import UsersPage from './components/UsersPage';
import buildAppSyncApolloClient from './api/buildAppSyncApolloClient';

const client = buildAppSyncApolloClient();

const App = (): JSX.Element => (
  <>
    <ApolloProvider client={client}>
      <div className={styles.App}>
        <UsersPage />
      </div>
    </ApolloProvider>
  </>
);

export default App;
