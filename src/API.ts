/* tslint:disable */
/* eslint-disable */
//  This file was automatically generated and should not be edited.

export type CreateUserInput = {
  UserID: string,
  name: string,
  dob?: string | null,
  address: string,
  description: string,
  createdAt: string,
  updatedAt: string,
};

export type UpdateUserInput = {
  UserID: string,
  name?: string | null,
  dob?: string | null,
  address?: string | null,
  description?: string | null,
  createdAt?: string | null,
  updatedAt?: string | null,
};

export type DeleteUserInput = {
  UserID: string,
};

export type TableUserFilterInput = {
  UserID?: TableStringFilterInput | null,
  name?: TableStringFilterInput | null,
  dob?: TableStringFilterInput | null,
  address?: TableStringFilterInput | null,
  description?: TableStringFilterInput | null,
  createdAt?: TableStringFilterInput | null,
  updatedAt?: TableStringFilterInput | null,
};

export type TableStringFilterInput = {
  ne?: string | null,
  eq?: string | null,
  le?: string | null,
  lt?: string | null,
  ge?: string | null,
  gt?: string | null,
  contains?: string | null,
  notContains?: string | null,
  between?: Array< string | null > | null,
  beginsWith?: string | null,
};

export type CreateUserMutationVariables = {
  input: CreateUserInput,
};

export type CreateUserMutation = {
  createUser:  {
    __typename: "User",
    UserID: string,
    name: string,
    dob: string | null,
    address: string,
    description: string,
    createdAt: string,
    updatedAt: string,
  } | null,
};

export type UpdateUserMutationVariables = {
  input: UpdateUserInput,
};

export type UpdateUserMutation = {
  updateUser:  {
    __typename: "User",
    UserID: string,
    name: string,
    dob: string | null,
    address: string,
    description: string,
    createdAt: string,
    updatedAt: string,
  } | null,
};

export type DeleteUserMutationVariables = {
  input: DeleteUserInput,
};

export type DeleteUserMutation = {
  deleteUser:  {
    __typename: "User",
    UserID: string,
    name: string,
    dob: string | null,
    address: string,
    description: string,
    createdAt: string,
    updatedAt: string,
  } | null,
};

export type GetUserQueryVariables = {
  UserID: string,
};

export type GetUserQuery = {
  getUser:  {
    __typename: "User",
    UserID: string,
    name: string,
    dob: string | null,
    address: string,
    description: string,
    createdAt: string,
    updatedAt: string,
  } | null,
};

export type ListUsersQueryVariables = {
  filter?: TableUserFilterInput | null,
  limit?: number | null,
  nextToken?: string | null,
};

export type ListUsersQuery = {
  listUsers:  {
    __typename: "UserConnection",
    items:  Array< {
      __typename: "User",
      UserID: string,
      name: string,
      dob: string | null,
      address: string,
      description: string,
      createdAt: string,
      updatedAt: string,
    } | null > | null,
    nextToken: string | null,
  } | null,
};

export type OnCreateUserSubscriptionVariables = {
  UserID?: string | null,
  name?: string | null,
  dob?: string | null,
  address?: string | null,
  description?: string | null,
};

export type OnCreateUserSubscription = {
  onCreateUser:  {
    __typename: "User",
    UserID: string,
    name: string,
    dob: string | null,
    address: string,
    description: string,
    createdAt: string,
    updatedAt: string,
  } | null,
};

export type OnUpdateUserSubscriptionVariables = {
  UserID?: string | null,
  name?: string | null,
  dob?: string | null,
  address?: string | null,
  description?: string | null,
};

export type OnUpdateUserSubscription = {
  onUpdateUser:  {
    __typename: "User",
    UserID: string,
    name: string,
    dob: string | null,
    address: string,
    description: string,
    createdAt: string,
    updatedAt: string,
  } | null,
};

export type OnDeleteUserSubscriptionVariables = {
  UserID?: string | null,
  name?: string | null,
  dob?: string | null,
  address?: string | null,
  description?: string | null,
};

export type OnDeleteUserSubscription = {
  onDeleteUser:  {
    __typename: "User",
    UserID: string,
    name: string,
    dob: string | null,
    address: string,
    description: string,
    createdAt: string,
    updatedAt: string,
  } | null,
};
