import {
  ApolloClient,
  InMemoryCache,
} from '@apollo/client';
import { LocalStorageWrapper, persistCache } from 'apollo3-cache-persist';

const client = async () => {
  const cache = new InMemoryCache({
    typePolicies: {
      Query: {
        fields: {
          users: {
            keyArgs: false,
            merge(existing = { edges: [] }, incoming) {
              return {
                ...existing,
                ...incoming,
                edges: [...existing?.edges, ...incoming?.edges],
              };
            },
          },
        },
      },
    },

  });

  // await before instantiating ApolloClient, else queries might run before the cache is persisted
  await persistCache({
    cache,
    storage: new LocalStorageWrapper(window.localStorage),
  });

  return new ApolloClient({
    uri: process.env.REACT_APP_GRAPHQL_ENDPOINT,
    cache,
  });
};

export default client;
