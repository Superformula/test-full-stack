import React from 'react';
import ReactDOM from 'react-dom';
import {
  ApolloProvider,
} from '@apollo/client';
import './index.css';
import App from './App';
import client from './GraphQL/client';

(async () => {
  const apolloClient = await client();

  ReactDOM.render(
    <React.StrictMode>
      <ApolloProvider client={apolloClient}>
        <App />
      </ApolloProvider>
    </React.StrictMode>,
    document.getElementById('root'),
  );
})();
