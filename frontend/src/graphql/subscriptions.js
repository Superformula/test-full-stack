/* eslint-disable */
// this is an auto generated file. This will be overwritten

export const onCreateUser = /* GraphQL */ `
  subscription OnCreateUser(
    $id: ID
    $name: String
    $dob: String
    $address: String
    $description: String
  ) {
    onCreateUser(
      id: $id
      name: $name
      dob: $dob
      address: $address
      description: $description
    ) {
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
export const onUpdateUser = /* GraphQL */ `
  subscription OnUpdateUser(
    $id: ID
    $name: String
    $dob: String
    $address: String
    $description: String
  ) {
    onUpdateUser(
      id: $id
      name: $name
      dob: $dob
      address: $address
      description: $description
    ) {
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
export const onDeleteUser = /* GraphQL */ `
  subscription OnDeleteUser(
    $id: ID
    $name: String
    $dob: String
    $address: String
    $description: String
  ) {
    onDeleteUser(
      id: $id
      name: $name
      dob: $dob
      address: $address
      description: $description
    ) {
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
