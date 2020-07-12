import AWSAppSyncClient from "aws-appsync";

const getAppSyncClient = async () => {
  let client = new AWSAppSyncClient({
    url: process.env.REACT_APP_AWS_APP_SYNC_GRAPHQL_URL,
    region: process.env.REACT_APP_AWS_APP_SYNC_REGION,
    auth: {
      type: "API_KEY",
      apiKey: process.env.REACT_APP_AWS_APP_SYNC_API_KEY,
    },
    disableOffline: true,
  });
  return await client.hydrated();
};

export default getAppSyncClient;
