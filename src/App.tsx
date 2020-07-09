import React from "react";
import { Provider } from "react-redux";
import appSyncConfig from "./aws-exports";
import { ApolloProvider, ApolloConsumer } from "react-apollo";
import AWSAppSyncClient, { defaultDataIdFromObject } from "aws-appsync";
import { Rehydrated } from "aws-appsync-react";
import createStore from "Store";
import Routes from "Routes";

const AppSyncClientObject = new AWSAppSyncClient({
  url: appSyncConfig.aws_appsync_graphqlEndpoint,
  region: appSyncConfig.aws_appsync_region,
  auth: {
    // @ts-ignore
    type: appSyncConfig.aws_appsync_authenticationType,
    apiKey:
      "https://ns724lxro5hxle4t447lnvi334.appsync-api.us-east-2.amazonaws.com/graphql",
  },
  cacheOptions: {
    dataIdFromObject: (obj) => {
      let id = defaultDataIdFromObject(obj);

      if (!id) {
        const { __typename: typename } = obj;
        switch (typename) {
          case "User": // @ts-ignore
            return `${typename}:${obj.UserID}`;
          default:
            return id;
        }
      }

      return id;
    },
  },
});

export type AppSyncClient = typeof AppSyncClientObject;

const WithAppSync = (Component: Function) => {
  return (
    <ApolloProvider client={AppSyncClientObject}>
      <Rehydrated>
        <ApolloConsumer>
          {(APIClient) => Component({ APIClient })}
        </ApolloConsumer>
      </Rehydrated>
    </ApolloProvider>
  );
};

const WithReduxProvider = ({
  APIClient,
  children,
}: {
  APIClient: AppSyncClient;
  children: JSX.Element;
}) => {
  const store = createStore({ APIClient });

  return <Provider store={store}>{children}</Provider>;
};

const App = () => {
  // const { appSetupLoading } = useSelector(state => state.App);
  // const dispatch = useDispatch();

  // useEffect(() => {
  //   dispatch(setupApp());
  // }, []);

  // return appSetupLoading ? <progress /> : <Routes />;

  return <Routes />;
};

export default () =>
  WithAppSync(({ APIClient }: { APIClient: AppSyncClient }) => (
    <WithReduxProvider APIClient={APIClient}>
      <App />
    </WithReduxProvider>
  ));
