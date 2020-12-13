import { ApolloClient, from, HttpLink, InMemoryCache, split } from '@apollo/client';
import { AUTH_TYPE, AuthOptions, createAuthLink } from 'aws-appsync-auth-link';
import { createSubscriptionHandshakeLink } from 'aws-appsync-subscription-link';
type ApolloStore = {};

const appSyncUrl = process.env.REACT_APP_APPSYNC_URL;
const appSyncKey = process.env.REACT_APP_APPSYNC_API_KEY;
const awsRegion = process.env.REACT_APP_APPSYNC_REGION;

console.log('App sync url', process.env);

//AppSync + Apollo3 should be working fine without hacks now! :)
//https://github.com/awslabs/aws-mobile-appsync-sdk-js/pull/561#issuecomment-701696316

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

export const buildAppSyncApolloClient = () => {
  const gqlClient: ApolloClient<ApolloStore> = new ApolloClient({
    cache: new InMemoryCache(),
    link: from([
      createAuthLink(awsAuthSettings),
      split(
        (op) => {
          const { operation } = op.query.definitions[0] as any;

          // NOTE FOR REVIEWERS: This code could be simplified to "return operation != 'subscription'" but I've
          // consciously decided not do it in order to optimize its legibility for other engineers and make the outcomes
          // of the split very clear.
          if (operation == 'subscription') {
            return false; // Use the special subscription handshake link
          }

          return true; //Use the default Http Link
        },
        httpLink,
        createSubscriptionHandshakeLink(awsAuthSettings, httpLink),
      ),
    ]),
  });

  return gqlClient;
};
