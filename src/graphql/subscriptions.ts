/* tslint:disable */
/* eslint-disable */
// this is an auto generated file. This will be overwritten

export const onCreateUser = /* GraphQL */ `
  subscription OnCreateUser(
    $UserID: String
    $name: String
    $dob: String
    $address: String
    $description: String
  ) {
    onCreateUser(
      UserID: $UserID
      name: $name
      dob: $dob
      address: $address
      description: $description
    ) {
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
export const onUpdateUser = /* GraphQL */ `
  subscription OnUpdateUser(
    $UserID: String
    $name: String
    $dob: String
    $address: String
    $description: String
  ) {
    onUpdateUser(
      UserID: $UserID
      name: $name
      dob: $dob
      address: $address
      description: $description
    ) {
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
export const onDeleteUser = /* GraphQL */ `
  subscription OnDeleteUser(
    $UserID: String
    $name: String
    $dob: String
    $address: String
    $description: String
  ) {
    onDeleteUser(
      UserID: $UserID
      name: $name
      dob: $dob
      address: $address
      description: $description
    ) {
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
