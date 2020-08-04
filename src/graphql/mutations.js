import gql from "graphql-tag";
/* eslint-disable */
// this is an auto generated file. This will be overwritten

export const createUser = /* GraphQL */ gql`
  mutation CreateUser($input: CreateUserInput!) {
    createUser(input: $input) {
      id
      name
      dob
      address
      description
      createdAt
      updatedAt
    }
  }
`;
export const updateUser = /* GraphQL */ gql`
  mutation UpdateUser($input: UpdateUserInput!) {
    updateUser(input: $input) {
      id
      name
      dob
      address
      description
      createdAt
      updatedAt
    }
  }
`;
export const deleteUser = /* GraphQL */ gql`
  mutation DeleteUser($input: DeleteUserInput!) {
    deleteUser(input: $input) {
      id
      name
      dob
      address
      description
      createdAt
      updatedAt
    }
  }
`;
