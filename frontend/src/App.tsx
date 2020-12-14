import React from 'react';
import { ApolloProvider } from '@apollo/client';
import { BrowserRouter as Router, Route } from 'react-router-dom';
import { Provider } from 'react-redux';
import { createStore } from 'redux';
import { QueryParamProvider } from 'use-query-params';
import styles from './App.module.scss';
import UsersPage from './components/UsersPage';
import buildAppSyncApolloClient from './api/buildAppSyncApolloClient';
import Reducers from './store/index';
import './modal.css';

const client = buildAppSyncApolloClient();

// TS REDUX: https://redux.js.org/recipes/usage-with-typescript

const App = (): JSX.Element => (
  <>
    <Router>
      <QueryParamProvider ReactRouterRoute={Route}>
        <ApolloProvider client={client}>
          <Provider
            store={createStore(
              Reducers,
              // eslint-disable-next-line @typescript-eslint/no-explicit-any,no-underscore-dangle
              (window as any).__REDUX_DEVTOOLS_EXTENSION__ && (window as any).__REDUX_DEVTOOLS_EXTENSION__(),
            )}
          >
            <div className={styles.App}>
              <UsersPage />
            </div>
          </Provider>
        </ApolloProvider>
      </QueryParamProvider>
    </Router>
  </>
);

export default App;
