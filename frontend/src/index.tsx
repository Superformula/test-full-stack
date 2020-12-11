import React from 'react';
import ReactDOM from 'react-dom';
import { ApolloClient, ApolloProvider, InMemoryCache } from '@apollo/client';
import mapboxgl from 'mapbox-gl';
import 'mapbox-gl/dist/mapbox-gl.css';

import App from './components/App/App';
import './index.scss';

const {
  REACT_APP_GRAPHQL_SERVER_URI,
  REACT_APP_GRAPHQL_SERVER_API_KEY,
  REACT_APP_MAPBOX_ACCESS_TOKEN,
} = process.env;

const client = new ApolloClient({
  uri: REACT_APP_GRAPHQL_SERVER_URI,
  cache: new InMemoryCache({
    typePolicies: {
      Query: {
        fields: {
          searchUsers: {
            keyArgs: false,
            merge(existing = {}, incoming, { args }) {
              return !args?.search && !args?.nextToken
                ? {
                    ...incoming,
                    users: incoming.users || [],
                    nextToken: incoming.nextToken || '',
                  }
                : {
                    ...existing,
                    ...incoming,
                    users: [
                      ...(existing.users || []),
                      ...(incoming.users || []),
                    ],
                    nextToken: incoming.nextToken || '',
                  };
            },
          },
        },
      },
    },
  }),
  headers: {
    'x-api-key': REACT_APP_GRAPHQL_SERVER_API_KEY || '',
  },
});

mapboxgl.accessToken = REACT_APP_MAPBOX_ACCESS_TOKEN || '';

ReactDOM.render(
  <React.StrictMode>
    <ApolloProvider client={client}>
      <App />
    </ApolloProvider>
  </React.StrictMode>,
  document.getElementById('root'),
);
