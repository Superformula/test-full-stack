/* tslint:disable */
/* eslint-disable */
// this is an auto generated file. This will be overwritten

export const getUser = /* GraphQL */ `
  query GetUser($UserID: String!) {
    getUser(UserID: $UserID) {
      UserID
      name
      dob
      address
      description
      createdAt
      updatedAt
    }
  }
`;
export const listUsers = /* GraphQL */ `
  query ListUsers(
    $filter: TableUserFilterInput
    $limit: Int
    $nextToken: String
  ) {
    listUsers(filter: $filter, limit: $limit, nextToken: $nextToken) {
      items {
        UserID
        name
        dob
        address
        description
        createdAt
        updatedAt
      }
      nextToken
    }
  }
`;
export const getUserGeolocation = /* GraphQL */ `
  query GetUserGeolocation($address: String!) {
    getUserGeolocation(address: $address) {
      longitude
      latitude
    }
  }
`;
