/* tslint:disable */
/* eslint-disable */
// @generated
// This file was automatically generated and should not be edited.

// ====================================================
// GraphQL query operation: ListUsers
// ====================================================

export interface ListUsers_users_pageInfo {
  __typename: "PageInfo";
  total: number | null;
  numPages: number | null;
  currentPage: number | null;
  pageSize: number | null;
}

export interface ListUsers_users_edges_node {
  __typename: "User";
  id: string;
  name: string | null;
  address: string | null;
  description: string | null;
  createdAt: any | null;
  updatedAt: any | null;
}

export interface ListUsers_users_edges {
  __typename: "UserEdge";
  node: ListUsers_users_edges_node | null;
}

export interface ListUsers_users {
  __typename: "UserConnection";
  pageInfo: ListUsers_users_pageInfo | null;
  edges: (ListUsers_users_edges | null)[] | null;
}

export interface ListUsers {
  users: ListUsers_users | null;
}
