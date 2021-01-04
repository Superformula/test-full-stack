import "../styles/globals.css";
import awsconfig from "../aws-exports";

import {
  ApolloClient,
  ApolloProvider,
  HttpLink,
  InMemoryCache,
} from "@apollo/client";

const client = new ApolloClient({
  link: new HttpLink({
    uri: awsconfig.aws_appsync_graphqlEndpoint,
    headers: { "x-api-key": awsconfig.aws_appsync_apiKey },
  }),
  cache: new InMemoryCache(),
});

function MyApp({ Component, pageProps }) {
  return (
    <ApolloProvider client={client}>
      <Component {...pageProps} />
    </ApolloProvider>
  );
}

export default MyApp;
