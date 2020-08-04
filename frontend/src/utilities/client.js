import React from "react";
import AWSAppSyncClient from "aws-appsync";
import AppSyncConfig from "../aws-exports";
import { ApolloProvider } from "react-apollo";
import { Rehydrated } from "aws-appsync-react";
import { createAuthLink } from "aws-appsync-auth-link";
import { createSubscriptionHandshakeLink } from "aws-appsync-subscription-link";
import { ApolloLink } from "apollo-link";
import { createHttpLink } from "apollo-link-http";

import App from "../App";

const url = AppSyncConfig.aws_appsync_graphqlEndpoint;
const region = AppSyncConfig.aws_appsync_region;
const auth = {
  type: AppSyncConfig.aws_appsync_authenticationType,
  apiKey: AppSyncConfig.aws_appsync_apiKey,
};

const httpLink = createHttpLink({
  uri: AppSyncConfig.aws_appsync_graphqlEndpoint,
});

const link = ApolloLink.from([
  createAuthLink({ url, region, auth }),
  createSubscriptionHandshakeLink(
    AppSyncConfig.aws_appsync_graphqlEndpoint,
    httpLink
  ),
]);

const client = new AWSAppSyncClient(
  {
    url,
    region,
    auth,
    disableOffline: true,
  },
  { link }
);

const WithProvider = () => (
  <ApolloProvider client={client}>
    <Rehydrated>
      <App />
    </Rehydrated>
  </ApolloProvider>
);

export default WithProvider;
