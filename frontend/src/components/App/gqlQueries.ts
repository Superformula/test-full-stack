import { gql } from '@apollo/client';

export const GET_USERS = gql`
  query GetUsers($search: String!, $nextToken: String!) {
    searchUsers(name: $search, limit: 6, nextToken: $nextToken) {
      users {
        id
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

export const UPDATE_USER = gql`
  mutation UpdateUser($id: ID!, $n: String!, $a: String!, $d: String!) {
    updateUser(id: $id, user: { name: $n, address: $a, description: $d }) {
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
