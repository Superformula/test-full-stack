import { ApolloClient, from, HttpLink, InMemoryCache, split } from '@apollo/client';
import { AUTH_TYPE, AuthOptions, createAuthLink } from 'aws-appsync-auth-link';
import { createSubscriptionHandshakeLink } from 'aws-appsync-subscription-link';

type ApolloStore = Record<string, unknown>;

const appSyncUrl = process.env.REACT_APP_APPSYNC_URL;
const appSyncKey = process.env.REACT_APP_APPSYNC_API_KEY;
const awsRegion = process.env.REACT_APP_APPSYNC_REGION;

const httpLink = new HttpLink({
  uri: appSyncUrl,
});

const awsAuthSettings = {
  url: appSyncUrl,
  auth: {
    type: AUTH_TYPE.API_KEY,
    apiKey: appSyncKey,
  } as AuthOptions,
  region: awsRegion,
};

const buildAppSyncApolloClient = () => {
  const gqlClient: ApolloClient<ApolloStore> = new ApolloClient({
    cache: new InMemoryCache(),
    link: from([
      createAuthLink(awsAuthSettings),
      split(
        (op) => {
          // eslint-disable-next-line @typescript-eslint/no-explicit-any
          const { operation } = op.query.definitions[0] as any;

          // NOTE FOR REVIEWERS: This code could be simplified to "return operation != 'subscription'" but I've
          // consciously decided not do it in order to optimize its legibility for other engineers and make the outcomes
          // of the split very clear.
          if (operation === 'subscription') {
            return false; // Use the special subscription handshake link
          }

          return true; // Use the default Http Link
        },
        httpLink,
        createSubscriptionHandshakeLink(awsAuthSettings, httpLink),
      ),
    ]),
  });

  return gqlClient;
};

export default buildAppSyncApolloClient;
