import { gql } from 'apollo-server-lambda';

const userSchema = gql`
type User {
	id: ID!
	name: String!
	dob: String
	address: String
	description: String
	createdAt: Int!
	updatedAt: Int
}

input CreateUserInput {
    name: String!
	dob: String
	address: String
	description: String
}

input UpdateUserInput {
    id: ID!
    name: String
	dob: String
	address: String
	description: String
}

input DeleteUserInput {
    id: ID!
}

input NextTokenInput {
  id: ID!
}

type NextTokenType {
  id: ID!
}

type GetUserPageResult {
  users: [User]!
  nextToken: NextTokenType
}

type Mutation {
    createUser(input: CreateUserInput!): User!
    updateUser(input: UpdateUserInput!): User!
    deleteUser(input: DeleteUserInput!): Boolean
}

type Query {
    getAllUsers: [User]!
    getPages(pageCount: Int, filter: String): GetUserPageResult
    getNextPage(nextToken: NextTokenInput, filter: String): GetUserPageResult
}
`;

export const schema = userSchema;

export interface UserModel {
    id: string; // UUID whatever that rfc is.
    name: string;
    dob?: string;
    address?: string;
    description?: string;
    createdAt: number;
    updatedAt?: number;
}

export interface GetNextPageInput {
    nextToken?: {
        id: string;
    };
    filter?: string;
}

export interface GetPagesInput {
    pageCount?: number;
    filter?: string;
}

export interface GetUserPageReturn {
    users: UserModel[];
    nextToken?: {
        id: string
    }
}

export interface CreateUserInput {
    input: {
        name: string;
        dob?: string;
        address?: string;
        description?: string;
    };
}

export type CreateUserReturn = UserModel;

export interface UpdateUserInput {
    input: {
        id: string;
        name: string;
        dob?: string;
        address?: string;
        description?: string;
    }
}

export type UpdateUserReturn = UserModel;

export interface DeleteUserInput {
    input: {
        id: string;
    }
}

