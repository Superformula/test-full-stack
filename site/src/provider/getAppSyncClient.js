import AWSAppSyncClient from "aws-appsync";

const getAppSyncClient = async () => {
  let client = new AWSAppSyncClient({
    url:
      "https://h6aq7lkbsfgh7f2okexpgs4bby.appsync-api.us-east-1.amazonaws.com/graphql",
    region: "us-east-1",
    auth: {
      type: "API_KEY",
      apiKey: "da2-wfof5j5a6vedfdxmv3njslhwzu",
    },
  });
  return await client.hydrated();
};

export default getAppSyncClient;
