/* tslint:disable */
/* eslint-disable */
// @generated
// This file was automatically generated and should not be edited.

// ====================================================
// GraphQL mutation operation: createUser
// ====================================================

export interface createUser_createUser_user {
  __typename: "User";
  id: string;
  name: string | null;
  dateOfBirth: any | null;
  address: string | null;
  description: string | null;
  createdAt: any | null;
  updatedAt: any | null;
}

export interface createUser_createUser {
  __typename: "CreateUser";
  user: createUser_createUser_user | null;
  ok: boolean | null;
}

export interface createUser {
  createUser: createUser_createUser | null;
}

export interface createUserVariables {
  name?: string | null;
  dateOfBirth?: any | null;
  address?: string | null;
}
