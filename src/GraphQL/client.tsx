import {
  ApolloClient,
  InMemoryCache,
} from '@apollo/client';

const client = new ApolloClient({
  uri: 'https://bjyx82su0i.execute-api.us-east-1.amazonaws.com/dev/graphql',
  cache: new InMemoryCache({
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

  }),
});

export default client;
