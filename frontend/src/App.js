import React from 'react';
import './App.css';
import { Dashboard } from './dashboard/Dashboard';
import { ApolloProvider, ApolloClient, InMemoryCache } from '@apollo/client';

const client = new ApolloClient({
  uri: 'https://9uviau5uch.execute-api.us-east-1.amazonaws.com/dev/graphql',
  cache: new InMemoryCache()
});

export const App = () => {
  return (
    <ApolloProvider client={client}>
      <div className={'body-container'}>
        <Dashboard />
      </div>
    </ApolloProvider>
  );
};
