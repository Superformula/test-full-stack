import "../styles/globals.css";
import awsconfig from "../aws-exports";

import {
  ApolloClient,
  ApolloProvider,
  HttpLink,
  InMemoryCache,
} from "@apollo/client";

const mergeListUsersQuery = (existing, incoming) => ({
  ...existing,
  ...incoming,
  items: (existing?.items ?? []).concat(incoming?.items ?? []),
});

const client = new ApolloClient({
  link: new HttpLink({
    uri: awsconfig.aws_appsync_graphqlEndpoint,
    headers: { "x-api-key": awsconfig.aws_appsync_apiKey },
  }),
  cache: new InMemoryCache({
    typePolicies: {
      Query: {
        fields: {
          listUsers: { keyArgs: ["filter"], merge: mergeListUsersQuery },
        },
      },
    },
  }),
});

function MyApp({ Component, pageProps }) {
  return (
    <ApolloProvider client={client}>
      <Component {...pageProps} />
    </ApolloProvider>
  );
}

export default MyApp;
