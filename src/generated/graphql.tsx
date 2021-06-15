import { gql } from '@apollo/client';
import * as Apollo from '@apollo/client';

export type Maybe<T> = T | null;
export type Exact<T extends { [key: string]: unknown }> = {
  [K in keyof T]: T[K];
};
export type MakeOptional<T, K extends keyof T> = Omit<T, K> &
  { [SubKey in K]?: Maybe<T[SubKey]> };
export type MakeMaybe<T, K extends keyof T> = Omit<T, K> &
  { [SubKey in K]: Maybe<T[SubKey]> };
const defaultOptions = {};
/** All built-in and custom scalars, mapped to their actual values */
export type Scalars = {
  ID: string;
  String: string;
  Boolean: boolean;
  Int: number;
  Float: number;
  /** Date custom scalar type */
  Date: any;
};

export type GeoLocation = {
  __typename?: 'GeoLocation';
  /** Latitude */
  latitude: Scalars['Float'];
  /** Longitude */
  longitude: Scalars['Float'];
  /** Address response result */
  address: Scalars['String'];
};

export type Mutation = {
  __typename?: 'Mutation';
  createUser: User;
  updateUser: User;
  deleteUser: User;
};

export type MutationCreateUserArgs = {
  data: UserRequest;
};

export type MutationUpdateUserArgs = {
  data: UserRequest;
  userId: Scalars['ID'];
};

export type MutationDeleteUserArgs = {
  id: Scalars['ID'];
};

export type Query = {
  __typename?: 'Query';
  users: UserPage;
  user: User;
  lookupAddress: GeoLocation;
};

export type QueryUsersArgs = {
  name?: Maybe<Scalars['String']>;
  nextPaginationKey?: Maybe<Scalars['String']>;
};

export type QueryUserArgs = {
  userId: Scalars['ID'];
};

export type QueryLookupAddressArgs = {
  address: Scalars['String'];
};

export type User = {
  __typename?: 'User';
  /** User Id */
  id: Scalars['String'];
  /** User Name */
  name: Scalars['String'];
  /** User date of birth */
  dob: Scalars['Date'];
  /** User address */
  address: Scalars['String'];
  /** User description */
  description: Scalars['String'];
  /** User created date */
  createdAt?: Maybe<Scalars['Date']>;
  /** User updated date */
  updatedAt?: Maybe<Scalars['Date']>;
  /** User avatar image url */
  imageUrl: Scalars['String'];
};

export type UserPage = {
  __typename?: 'UserPage';
  /** List of users */
  list: Array<User>;
  /** Next pagination key */
  nextPaginationKey?: Maybe<Scalars['String']>;
};

/** Create User Request */
export type UserRequest = {
  /** User Name */
  name: Scalars['String'];
  /** User date of birth */
  dob: Scalars['Date'];
  /** User address */
  address: Scalars['String'];
  /** User description */
  description: Scalars['String'];
  /** User avatar image url */
  imageUrl: Scalars['String'];
};

export type FetchUsersQueryVariables = Exact<{
  name?: Maybe<Scalars['String']>;
  nextPaginationKey?: Maybe<Scalars['String']>;
}>;

export type FetchUsersQuery = { __typename?: 'Query' } & {
  users: { __typename?: 'UserPage' } & Pick<UserPage, 'nextPaginationKey'> & {
      list: Array<
        { __typename?: 'User' } & Pick<
          User,
          | 'id'
          | 'name'
          | 'address'
          | 'createdAt'
          | 'description'
          | 'dob'
          | 'imageUrl'
          | 'updatedAt'
        >
      >;
    };
};

export type LookupAddressQueryVariables = Exact<{
  address: Scalars['String'];
}>;

export type LookupAddressQuery = { __typename?: 'Query' } & {
  lookupAddress: { __typename?: 'GeoLocation' } & Pick<
    GeoLocation,
    'address' | 'latitude' | 'longitude'
  >;
};

export type UpdateUserMutationVariables = Exact<{
  userId: Scalars['ID'];
  data: UserRequest;
}>;

export type UpdateUserMutation = { __typename?: 'Mutation' } & {
  updateUser: { __typename?: 'User' } & Pick<
    User,
    'id' | 'address' | 'name' | 'description'
  >;
};

export const FetchUsersDocument = gql`
  query fetchUsers($name: String, $nextPaginationKey: String) {
    users(name: $name, nextPaginationKey: $nextPaginationKey) {
      list {
        id
        name
        address
        createdAt
        description
        dob
        imageUrl
        updatedAt
      }
      nextPaginationKey
    }
  }
`;

/**
 * __useFetchUsersQuery__
 *
 * To run a query within a React component, call `useFetchUsersQuery` and pass it any options that fit your needs.
 * When your component renders, `useFetchUsersQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useFetchUsersQuery({
 *   variables: {
 *      name: // value for 'name'
 *      nextPaginationKey: // value for 'nextPaginationKey'
 *   },
 * });
 */
export function useFetchUsersQuery(
  baseOptions?: Apollo.QueryHookOptions<
    FetchUsersQuery,
    FetchUsersQueryVariables
  >
) {
  const options = { ...defaultOptions, ...baseOptions };
  return Apollo.useQuery<FetchUsersQuery, FetchUsersQueryVariables>(
    FetchUsersDocument,
    options
  );
}
export function useFetchUsersLazyQuery(
  baseOptions?: Apollo.LazyQueryHookOptions<
    FetchUsersQuery,
    FetchUsersQueryVariables
  >
) {
  const options = { ...defaultOptions, ...baseOptions };
  return Apollo.useLazyQuery<FetchUsersQuery, FetchUsersQueryVariables>(
    FetchUsersDocument,
    options
  );
}
export type FetchUsersQueryHookResult = ReturnType<typeof useFetchUsersQuery>;
export type FetchUsersLazyQueryHookResult = ReturnType<
  typeof useFetchUsersLazyQuery
>;
export type FetchUsersQueryResult = Apollo.QueryResult<
  FetchUsersQuery,
  FetchUsersQueryVariables
>;
export const LookupAddressDocument = gql`
  query lookupAddress($address: String!) {
    lookupAddress(address: $address) {
      address
      latitude
      longitude
    }
  }
`;

/**
 * __useLookupAddressQuery__
 *
 * To run a query within a React component, call `useLookupAddressQuery` and pass it any options that fit your needs.
 * When your component renders, `useLookupAddressQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useLookupAddressQuery({
 *   variables: {
 *      address: // value for 'address'
 *   },
 * });
 */
export function useLookupAddressQuery(
  baseOptions: Apollo.QueryHookOptions<
    LookupAddressQuery,
    LookupAddressQueryVariables
  >
) {
  const options = { ...defaultOptions, ...baseOptions };
  return Apollo.useQuery<LookupAddressQuery, LookupAddressQueryVariables>(
    LookupAddressDocument,
    options
  );
}
export function useLookupAddressLazyQuery(
  baseOptions?: Apollo.LazyQueryHookOptions<
    LookupAddressQuery,
    LookupAddressQueryVariables
  >
) {
  const options = { ...defaultOptions, ...baseOptions };
  return Apollo.useLazyQuery<LookupAddressQuery, LookupAddressQueryVariables>(
    LookupAddressDocument,
    options
  );
}
export type LookupAddressQueryHookResult = ReturnType<
  typeof useLookupAddressQuery
>;
export type LookupAddressLazyQueryHookResult = ReturnType<
  typeof useLookupAddressLazyQuery
>;
export type LookupAddressQueryResult = Apollo.QueryResult<
  LookupAddressQuery,
  LookupAddressQueryVariables
>;
export const UpdateUserDocument = gql`
  mutation updateUser($userId: ID!, $data: UserRequest!) {
    updateUser(userId: $userId, data: $data) {
      id
      address
      name
      description
    }
  }
`;
export type UpdateUserMutationFn = Apollo.MutationFunction<
  UpdateUserMutation,
  UpdateUserMutationVariables
>;

/**
 * __useUpdateUserMutation__
 *
 * To run a mutation, you first call `useUpdateUserMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useUpdateUserMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [updateUserMutation, { data, loading, error }] = useUpdateUserMutation({
 *   variables: {
 *      userId: // value for 'userId'
 *      data: // value for 'data'
 *   },
 * });
 */
export function useUpdateUserMutation(
  baseOptions?: Apollo.MutationHookOptions<
    UpdateUserMutation,
    UpdateUserMutationVariables
  >
) {
  const options = { ...defaultOptions, ...baseOptions };
  return Apollo.useMutation<UpdateUserMutation, UpdateUserMutationVariables>(
    UpdateUserDocument,
    options
  );
}
export type UpdateUserMutationHookResult = ReturnType<
  typeof useUpdateUserMutation
>;
export type UpdateUserMutationResult =
  Apollo.MutationResult<UpdateUserMutation>;
export type UpdateUserMutationOptions = Apollo.BaseMutationOptions<
  UpdateUserMutation,
  UpdateUserMutationVariables
>;
