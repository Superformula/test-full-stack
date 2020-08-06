import { graphqlOperation, API } from "aws-amplify";
import retry from "async-retry";

export const SubscribeToUsers = `
subscription OnUpdateUser {
  onUpdateUser {
    id
    name
    avatar
    address
    description
    createdAt
    version
  }
}
`;


export const ListUsers = `
query ListUsers($limit: Int, $nextToken: String, $filter: ModelUserFilterInput) {
  listUsers(limit: $limit, nextToken: $nextToken, filter: $filter) {
    nextToken
    items {
      id
      name
      avatar
      address
      description
      createdAt
      version
    }
  }
}`;

export const UpdateUser = `
mutation UpdateUser($id: ID!, $name: String, $address: String, $description: String, $expectedVersion: Int!) {
  updateUser( input: {
    id: $id, 
    name: $name, 
    address: $address, 
    description: $description
    expectedVersion: $expectedVersion
  }) {
    id
    name
    address
    description
    updatedAt
  }
}`;

export const GqlRetry = async (query: any, variables?: any) => {
  return await retry(
    async () => {
      return await API.graphql(graphqlOperation(query, variables));
    },
    {
      retries: 10,
    }
  );
};