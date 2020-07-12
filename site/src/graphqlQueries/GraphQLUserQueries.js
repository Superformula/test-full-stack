import gql from "graphql-tag";

const GraphQLUserQueries = {
  getUsers: gql`
    query getUsersQuery(
      $filter: String
      $limit: Int
      $startKey: StartKeyInput
    ) {
      getUsers(filter: $filter, limit: $limit, startKey: $startKey) {
        items {
          id
          name
          image
          dateOfBirth
          address
          description
          createdAt
          updatedAt
        }
        startKey {
          id
        }
      }
    }
  `,
  addUser: gql`
    mutation addUserMutation(
      $name: String
      $dateOfBirth: Float
      $address: String
      $description: String
    ) {
      addUser(
        input: {
          name: $name
          dateOfBirth: $dateOfBirth
          address: $address
          description: $description
        }
      ) {
        id
        name
        image
        address
        dateOfBirth
        description
        createdAt
        updatedAt
      }
    }
  `,
  deleteUser: gql`
    mutation deleteUserMutation($id: ID) {
      deleteUser(input: { id: $id }) {
        id
        name
      }
    }
  `,
  updateUser: gql`
    mutation updateUserMutation(
      $id: ID
      $name: String
      $dateOfBirth: Float
      $address: String
      $description: String
    ) {
      updateUser(
        input: {
          id: $id
          name: $name
          dateOfBirth: $dateOfBirth
          address: $address
          description: $description
        }
      ) {
        id
        name
        image
        address
        dateOfBirth
        description
        createdAt
        updatedAt
      }
    }
  `,
  updateUserSub: gql`
    subscription UpdateUserSub {
      updatedUser {
        id
        name
        image
        address
        dateOfBirth
        description
        createdAt
        updatedAt
      }
    }
  `,
  addUserSub: gql`
    subscription AddUserSub {
      addedUser {
        id
        name
        image
        address
        dateOfBirth
        description
        createdAt
        updatedAt
      }
    }
  `,
  deleteUserSub: gql`
    subscription DeleteUserSub {
      deletedUser {
        id
        name
        image
        address
        dateOfBirth
        description
        createdAt
        updatedAt
      }
    }
  `,
};

export default GraphQLUserQueries;
