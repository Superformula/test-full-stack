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
    uri: 'https://bjyx82su0i.execute-api.us-east-1.amazonaws.com/dev/graphql',
    cache,
  });
};

export default client;
