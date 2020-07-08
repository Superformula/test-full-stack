// @ts-nocheck
import React from "react";
import { Provider } from "react-redux";
import appSyncConfig from "./aws-exports";
import { ApolloProvider, ApolloConsumer } from "react-apollo";
import AWSAppSyncClient, { defaultDataIdFromObject } from "aws-appsync";
import { Rehydrated } from "aws-appsync-react";
import createStore from "Store";
import Routes from "Routes";

const client = new AWSAppSyncClient({
  url: appSyncConfig.aws_appsync_graphqlEndpoint,
  region: appSyncConfig.aws_appsync_region,
  auth: {
    type: appSyncConfig.aws_appsync_authenticationType,
    apiKey: appSyncConfig.aws_appsync_apiKey,
  },
  cacheOptions: {
    dataIdFromObject: (obj) => {
      let id = defaultDataIdFromObject(obj);

      if (!id) {
        const { __typename: typename } = obj;
        switch (typename) {
          case "User":
            return `${typename}:${obj.UserID}`;
          default:
            return id;
        }
      }

      return id;
    },
  },
});

export type AppSyncClient = typeof client;

const WithAppSync = ({ component }) => {
  return (
    <ApolloProvider client={client}>
      <Rehydrated>
        <ApolloConsumer>{(client) => component({ client })}</ApolloConsumer>
      </Rehydrated>
    </ApolloProvider>
  );
};

const App = ({ client }) => {
  const store = createStore(client);

  return (
    <Provider store={store}>
      <Routes />
    </Provider>
  );
};

export default () => <WithAppSync component={App} />;
