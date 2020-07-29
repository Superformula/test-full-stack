import gql from 'graphql-tag';
import * as React from 'react';
import * as ApolloReactCommon from '@apollo/react-common';
import * as ApolloReactComponents from '@apollo/react-components';
import * as ApolloReactHoc from '@apollo/react-hoc';
import * as ApolloReactHooks from '@apollo/react-hooks';
export type Maybe<T> = T | null | undefined;
export type Exact<T extends { [key: string]: any }> = { [K in keyof T]: T[K] };
export type Omit<T, K extends keyof T> = Pick<T, Exclude<keyof T, K>>;
/** All built-in and custom scalars, mapped to their actual values */
export type Scalars = {
  ID: string;
  String: string;
  Boolean: boolean;
  Int: number;
  Float: number;
  /** The `AWSDate` scalar type provided by AWS AppSync, represents a valid ***extended*** [ISO 8601 Date](https://en.wikipedia.org/wiki/ISO_8601#Calendar_dates) string. In other words, this scalar type accepts date strings of the form `YYYY-MM-DD`.  The scalar can also accept "negative years" of the form `-YYYY` which correspond to years before `0000`. For example, "**-2017-05-01**" and "**-9999-01-01**" are both valid dates.  This scalar type can also accept an optional [time zone offset](https://en.wikipedia.org/wiki/ISO_8601#Time_zone_designators). For example, "**1970-01-01**", "**1970-01-01Z**", "**1970-01-01-07:00**" and "**1970-01-01+05:30**" are all valid dates. The time zone offset must either be `Z` (representing the UTC time zone) or be in the format `±hh:mm:ss`. The seconds field in the timezone offset will be considered valid even though it is not part of the ISO 8601 standard. */
  AWSDate: any;
  /** The `AWSDateTime` scalar type provided by AWS AppSync, represents a valid ***extended*** [ISO 8601 DateTime](https://en.wikipedia.org/wiki/ISO_8601#Combined_date_and_time_representations) string. In other words, this scalar type accepts datetime strings of the form `YYYY-MM-DDThh:mm:ss.SSSZ`.  The scalar can also accept "negative years" of the form `-YYYY` which correspond to years before `0000`. For example, "**-2017-01-01T00:00Z**" and "**-9999-01-01T00:00Z**" are both valid datetime strings.  The field after the two digit seconds field is a nanoseconds field. It can accept between 1 and 9 digits. So, for example, "**1970-01-01T12:00:00.2Z**", "**1970-01-01T12:00:00.277Z**" and "**1970-01-01T12:00:00.123456789Z**" are all valid datetime strings.  The seconds and nanoseconds fields are optional (the seconds field must be specified if the nanoseconds field is to be used).  The [time zone offset](https://en.wikipedia.org/wiki/ISO_8601#Time_zone_designators) is compulsory for this scalar. The time zone offset must either be `Z` (representing the UTC time zone) or be in the format `±hh:mm:ss`. The seconds field in the timezone offset will be considered valid even though it is not part of the ISO 8601 standard. */
  AWSDateTime: any;
};

export type Query = {
  __typename?: 'Query';
  user?: Maybe<User>;
  users: UserConnection;
  searchAddress: Array<Address>;
  getCoordinates?: Maybe<LatLng>;
};


export type QueryUserArgs = {
  id: Scalars['ID'];
};


export type QueryUsersArgs = {
  name?: Maybe<Scalars['String']>;
  after?: Maybe<Scalars['String']>;
  limit?: Maybe<Scalars['Int']>;
};


export type QuerySearchAddressArgs = {
  text: Scalars['String'];
};


export type QueryGetCoordinatesArgs = {
  placeId: Scalars['String'];
};

export type User = {
  __typename?: 'User';
  id: Scalars['ID'];
  avatar: Scalars['String'];
  name: Scalars['String'];
  dob?: Maybe<Scalars['AWSDate']>;
  address: Scalars['String'];
  latitude?: Maybe<Scalars['Float']>;
  longitude?: Maybe<Scalars['Float']>;
  description?: Maybe<Scalars['String']>;
  createdAt: Scalars['AWSDateTime'];
  updatedAt: Scalars['AWSDateTime'];
};



export type UserConnection = {
  __typename?: 'UserConnection';
  list: Array<User>;
  nextToken?: Maybe<Scalars['String']>;
};

export type Address = {
  __typename?: 'Address';
  text: Scalars['String'];
  placeId: Scalars['String'];
};

export type LatLng = {
  __typename?: 'LatLng';
  latitude?: Maybe<Scalars['Float']>;
  longitude?: Maybe<Scalars['Float']>;
};

export type Mutation = {
  __typename?: 'Mutation';
  createUser: User;
  updateUser: User;
  deleteUser: User;
};


export type MutationCreateUserArgs = {
  body: UserRequest;
};


export type MutationUpdateUserArgs = {
  id: Scalars['ID'];
  body: UserRequest;
};


export type MutationDeleteUserArgs = {
  id: Scalars['ID'];
};

export type UserRequest = {
  name: Scalars['String'];
  dob?: Maybe<Scalars['AWSDate']>;
  address: Scalars['String'];
  latitude?: Maybe<Scalars['Float']>;
  longitude?: Maybe<Scalars['Float']>;
  description?: Maybe<Scalars['String']>;
};

export type Subscription = {
  __typename?: 'Subscription';
  userChanged?: Maybe<User>;
  userDeleted?: Maybe<User>;
};

export type SearchAddressQueryVariables = Exact<{
  text: Scalars['String'];
}>;


export type SearchAddressQuery = (
  { __typename?: 'Query' }
  & { searchAddress: Array<(
    { __typename?: 'Address' }
    & Pick<Address, 'text' | 'placeId'>
  )> }
);

export type GetCoordinatesQueryVariables = Exact<{
  placeId: Scalars['String'];
}>;


export type GetCoordinatesQuery = (
  { __typename?: 'Query' }
  & { getCoordinates?: Maybe<(
    { __typename?: 'LatLng' }
    & Pick<LatLng, 'latitude' | 'longitude'>
  )> }
);

export type CreateUserMutationVariables = Exact<{
  body: UserRequest;
}>;


export type CreateUserMutation = (
  { __typename?: 'Mutation' }
  & { createUser: (
    { __typename?: 'User' }
    & Pick<User, 'id' | 'name' | 'avatar' | 'description'>
  ) }
);

export type UpdateUserMutationVariables = Exact<{
  id: Scalars['ID'];
  body: UserRequest;
}>;


export type UpdateUserMutation = (
  { __typename?: 'Mutation' }
  & { updateUser: (
    { __typename?: 'User' }
    & Pick<User, 'id' | 'name' | 'avatar' | 'description'>
  ) }
);

export type DeleteUserMutationVariables = Exact<{
  id: Scalars['ID'];
}>;


export type DeleteUserMutation = (
  { __typename?: 'Mutation' }
  & { deleteUser: (
    { __typename?: 'User' }
    & Pick<User, 'id'>
  ) }
);

export type ListUsersQueryVariables = Exact<{
  name?: Maybe<Scalars['String']>;
  after?: Maybe<Scalars['String']>;
  limit?: Maybe<Scalars['Int']>;
}>;


export type ListUsersQuery = (
  { __typename?: 'Query' }
  & { users: (
    { __typename?: 'UserConnection' }
    & Pick<UserConnection, 'nextToken'>
    & { list: Array<(
      { __typename?: 'User' }
      & Pick<User, 'id' | 'name' | 'avatar' | 'description'>
    )> }
  ) }
);

export type GetUserQueryVariables = Exact<{
  id: Scalars['ID'];
}>;


export type GetUserQuery = (
  { __typename?: 'Query' }
  & { user?: Maybe<(
    { __typename?: 'User' }
    & Pick<User, 'id' | 'avatar' | 'name' | 'description' | 'latitude' | 'longitude' | 'address'>
  )> }
);

export type WatchUsersSubscriptionVariables = Exact<{ [key: string]: never; }>;


export type WatchUsersSubscription = (
  { __typename?: 'Subscription' }
  & { userChanged?: Maybe<(
    { __typename?: 'User' }
    & Pick<User, 'id' | 'name' | 'avatar' | 'description'>
  )> }
);

export type WatchDeletedUsersSubscriptionVariables = Exact<{ [key: string]: never; }>;


export type WatchDeletedUsersSubscription = (
  { __typename?: 'Subscription' }
  & { userDeleted?: Maybe<(
    { __typename?: 'User' }
    & Pick<User, 'id'>
  )> }
);


export const SearchAddressDocument = gql`
    query searchAddress($text: String!) {
  searchAddress(text: $text) {
    text
    placeId
  }
}
    `;
export type SearchAddressComponentProps = Omit<ApolloReactComponents.QueryComponentOptions<SearchAddressQuery, SearchAddressQueryVariables>, 'query'> & ({ variables: SearchAddressQueryVariables; skip?: boolean; } | { skip: boolean; });

    export const SearchAddressComponent = (props: SearchAddressComponentProps) => (
      <ApolloReactComponents.Query<SearchAddressQuery, SearchAddressQueryVariables> query={SearchAddressDocument} {...props} />
    );
    
export type SearchAddressProps<TChildProps = {}, TDataName extends string = 'data'> = {
      [key in TDataName]: ApolloReactHoc.DataValue<SearchAddressQuery, SearchAddressQueryVariables>
    } & TChildProps;
export function withSearchAddress<TProps, TChildProps = {}, TDataName extends string = 'data'>(operationOptions?: ApolloReactHoc.OperationOption<
  TProps,
  SearchAddressQuery,
  SearchAddressQueryVariables,
  SearchAddressProps<TChildProps, TDataName>>) {
    return ApolloReactHoc.withQuery<TProps, SearchAddressQuery, SearchAddressQueryVariables, SearchAddressProps<TChildProps, TDataName>>(SearchAddressDocument, {
      alias: 'searchAddress',
      ...operationOptions
    });
};

/**
 * __useSearchAddressQuery__
 *
 * To run a query within a React component, call `useSearchAddressQuery` and pass it any options that fit your needs.
 * When your component renders, `useSearchAddressQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useSearchAddressQuery({
 *   variables: {
 *      text: // value for 'text'
 *   },
 * });
 */
export function useSearchAddressQuery(baseOptions?: ApolloReactHooks.QueryHookOptions<SearchAddressQuery, SearchAddressQueryVariables>) {
        return ApolloReactHooks.useQuery<SearchAddressQuery, SearchAddressQueryVariables>(SearchAddressDocument, baseOptions);
      }
export function useSearchAddressLazyQuery(baseOptions?: ApolloReactHooks.LazyQueryHookOptions<SearchAddressQuery, SearchAddressQueryVariables>) {
          return ApolloReactHooks.useLazyQuery<SearchAddressQuery, SearchAddressQueryVariables>(SearchAddressDocument, baseOptions);
        }
export type SearchAddressQueryHookResult = ReturnType<typeof useSearchAddressQuery>;
export type SearchAddressLazyQueryHookResult = ReturnType<typeof useSearchAddressLazyQuery>;
export type SearchAddressQueryResult = ApolloReactCommon.QueryResult<SearchAddressQuery, SearchAddressQueryVariables>;
export const GetCoordinatesDocument = gql`
    query getCoordinates($placeId: String!) {
  getCoordinates(placeId: $placeId) {
    latitude
    longitude
  }
}
    `;
export type GetCoordinatesComponentProps = Omit<ApolloReactComponents.QueryComponentOptions<GetCoordinatesQuery, GetCoordinatesQueryVariables>, 'query'> & ({ variables: GetCoordinatesQueryVariables; skip?: boolean; } | { skip: boolean; });

    export const GetCoordinatesComponent = (props: GetCoordinatesComponentProps) => (
      <ApolloReactComponents.Query<GetCoordinatesQuery, GetCoordinatesQueryVariables> query={GetCoordinatesDocument} {...props} />
    );
    
export type GetCoordinatesProps<TChildProps = {}, TDataName extends string = 'data'> = {
      [key in TDataName]: ApolloReactHoc.DataValue<GetCoordinatesQuery, GetCoordinatesQueryVariables>
    } & TChildProps;
export function withGetCoordinates<TProps, TChildProps = {}, TDataName extends string = 'data'>(operationOptions?: ApolloReactHoc.OperationOption<
  TProps,
  GetCoordinatesQuery,
  GetCoordinatesQueryVariables,
  GetCoordinatesProps<TChildProps, TDataName>>) {
    return ApolloReactHoc.withQuery<TProps, GetCoordinatesQuery, GetCoordinatesQueryVariables, GetCoordinatesProps<TChildProps, TDataName>>(GetCoordinatesDocument, {
      alias: 'getCoordinates',
      ...operationOptions
    });
};

/**
 * __useGetCoordinatesQuery__
 *
 * To run a query within a React component, call `useGetCoordinatesQuery` and pass it any options that fit your needs.
 * When your component renders, `useGetCoordinatesQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useGetCoordinatesQuery({
 *   variables: {
 *      placeId: // value for 'placeId'
 *   },
 * });
 */
export function useGetCoordinatesQuery(baseOptions?: ApolloReactHooks.QueryHookOptions<GetCoordinatesQuery, GetCoordinatesQueryVariables>) {
        return ApolloReactHooks.useQuery<GetCoordinatesQuery, GetCoordinatesQueryVariables>(GetCoordinatesDocument, baseOptions);
      }
export function useGetCoordinatesLazyQuery(baseOptions?: ApolloReactHooks.LazyQueryHookOptions<GetCoordinatesQuery, GetCoordinatesQueryVariables>) {
          return ApolloReactHooks.useLazyQuery<GetCoordinatesQuery, GetCoordinatesQueryVariables>(GetCoordinatesDocument, baseOptions);
        }
export type GetCoordinatesQueryHookResult = ReturnType<typeof useGetCoordinatesQuery>;
export type GetCoordinatesLazyQueryHookResult = ReturnType<typeof useGetCoordinatesLazyQuery>;
export type GetCoordinatesQueryResult = ApolloReactCommon.QueryResult<GetCoordinatesQuery, GetCoordinatesQueryVariables>;
export const CreateUserDocument = gql`
    mutation createUser($body: UserRequest!) {
  createUser(body: $body) {
    id
    name
    avatar
    description
  }
}
    `;
export type CreateUserMutationFn = ApolloReactCommon.MutationFunction<CreateUserMutation, CreateUserMutationVariables>;
export type CreateUserComponentProps = Omit<ApolloReactComponents.MutationComponentOptions<CreateUserMutation, CreateUserMutationVariables>, 'mutation'>;

    export const CreateUserComponent = (props: CreateUserComponentProps) => (
      <ApolloReactComponents.Mutation<CreateUserMutation, CreateUserMutationVariables> mutation={CreateUserDocument} {...props} />
    );
    
export type CreateUserProps<TChildProps = {}, TDataName extends string = 'mutate'> = {
      [key in TDataName]: ApolloReactCommon.MutationFunction<CreateUserMutation, CreateUserMutationVariables>
    } & TChildProps;
export function withCreateUser<TProps, TChildProps = {}, TDataName extends string = 'mutate'>(operationOptions?: ApolloReactHoc.OperationOption<
  TProps,
  CreateUserMutation,
  CreateUserMutationVariables,
  CreateUserProps<TChildProps, TDataName>>) {
    return ApolloReactHoc.withMutation<TProps, CreateUserMutation, CreateUserMutationVariables, CreateUserProps<TChildProps, TDataName>>(CreateUserDocument, {
      alias: 'createUser',
      ...operationOptions
    });
};

/**
 * __useCreateUserMutation__
 *
 * To run a mutation, you first call `useCreateUserMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useCreateUserMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [createUserMutation, { data, loading, error }] = useCreateUserMutation({
 *   variables: {
 *      body: // value for 'body'
 *   },
 * });
 */
export function useCreateUserMutation(baseOptions?: ApolloReactHooks.MutationHookOptions<CreateUserMutation, CreateUserMutationVariables>) {
        return ApolloReactHooks.useMutation<CreateUserMutation, CreateUserMutationVariables>(CreateUserDocument, baseOptions);
      }
export type CreateUserMutationHookResult = ReturnType<typeof useCreateUserMutation>;
export type CreateUserMutationResult = ApolloReactCommon.MutationResult<CreateUserMutation>;
export type CreateUserMutationOptions = ApolloReactCommon.BaseMutationOptions<CreateUserMutation, CreateUserMutationVariables>;
export const UpdateUserDocument = gql`
    mutation updateUser($id: ID!, $body: UserRequest!) {
  updateUser(id: $id, body: $body) {
    id
    name
    avatar
    description
  }
}
    `;
export type UpdateUserMutationFn = ApolloReactCommon.MutationFunction<UpdateUserMutation, UpdateUserMutationVariables>;
export type UpdateUserComponentProps = Omit<ApolloReactComponents.MutationComponentOptions<UpdateUserMutation, UpdateUserMutationVariables>, 'mutation'>;

    export const UpdateUserComponent = (props: UpdateUserComponentProps) => (
      <ApolloReactComponents.Mutation<UpdateUserMutation, UpdateUserMutationVariables> mutation={UpdateUserDocument} {...props} />
    );
    
export type UpdateUserProps<TChildProps = {}, TDataName extends string = 'mutate'> = {
      [key in TDataName]: ApolloReactCommon.MutationFunction<UpdateUserMutation, UpdateUserMutationVariables>
    } & TChildProps;
export function withUpdateUser<TProps, TChildProps = {}, TDataName extends string = 'mutate'>(operationOptions?: ApolloReactHoc.OperationOption<
  TProps,
  UpdateUserMutation,
  UpdateUserMutationVariables,
  UpdateUserProps<TChildProps, TDataName>>) {
    return ApolloReactHoc.withMutation<TProps, UpdateUserMutation, UpdateUserMutationVariables, UpdateUserProps<TChildProps, TDataName>>(UpdateUserDocument, {
      alias: 'updateUser',
      ...operationOptions
    });
};

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
 *      id: // value for 'id'
 *      body: // value for 'body'
 *   },
 * });
 */
export function useUpdateUserMutation(baseOptions?: ApolloReactHooks.MutationHookOptions<UpdateUserMutation, UpdateUserMutationVariables>) {
        return ApolloReactHooks.useMutation<UpdateUserMutation, UpdateUserMutationVariables>(UpdateUserDocument, baseOptions);
      }
export type UpdateUserMutationHookResult = ReturnType<typeof useUpdateUserMutation>;
export type UpdateUserMutationResult = ApolloReactCommon.MutationResult<UpdateUserMutation>;
export type UpdateUserMutationOptions = ApolloReactCommon.BaseMutationOptions<UpdateUserMutation, UpdateUserMutationVariables>;
export const DeleteUserDocument = gql`
    mutation deleteUser($id: ID!) {
  deleteUser(id: $id) {
    id
  }
}
    `;
export type DeleteUserMutationFn = ApolloReactCommon.MutationFunction<DeleteUserMutation, DeleteUserMutationVariables>;
export type DeleteUserComponentProps = Omit<ApolloReactComponents.MutationComponentOptions<DeleteUserMutation, DeleteUserMutationVariables>, 'mutation'>;

    export const DeleteUserComponent = (props: DeleteUserComponentProps) => (
      <ApolloReactComponents.Mutation<DeleteUserMutation, DeleteUserMutationVariables> mutation={DeleteUserDocument} {...props} />
    );
    
export type DeleteUserProps<TChildProps = {}, TDataName extends string = 'mutate'> = {
      [key in TDataName]: ApolloReactCommon.MutationFunction<DeleteUserMutation, DeleteUserMutationVariables>
    } & TChildProps;
export function withDeleteUser<TProps, TChildProps = {}, TDataName extends string = 'mutate'>(operationOptions?: ApolloReactHoc.OperationOption<
  TProps,
  DeleteUserMutation,
  DeleteUserMutationVariables,
  DeleteUserProps<TChildProps, TDataName>>) {
    return ApolloReactHoc.withMutation<TProps, DeleteUserMutation, DeleteUserMutationVariables, DeleteUserProps<TChildProps, TDataName>>(DeleteUserDocument, {
      alias: 'deleteUser',
      ...operationOptions
    });
};

/**
 * __useDeleteUserMutation__
 *
 * To run a mutation, you first call `useDeleteUserMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useDeleteUserMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [deleteUserMutation, { data, loading, error }] = useDeleteUserMutation({
 *   variables: {
 *      id: // value for 'id'
 *   },
 * });
 */
export function useDeleteUserMutation(baseOptions?: ApolloReactHooks.MutationHookOptions<DeleteUserMutation, DeleteUserMutationVariables>) {
        return ApolloReactHooks.useMutation<DeleteUserMutation, DeleteUserMutationVariables>(DeleteUserDocument, baseOptions);
      }
export type DeleteUserMutationHookResult = ReturnType<typeof useDeleteUserMutation>;
export type DeleteUserMutationResult = ApolloReactCommon.MutationResult<DeleteUserMutation>;
export type DeleteUserMutationOptions = ApolloReactCommon.BaseMutationOptions<DeleteUserMutation, DeleteUserMutationVariables>;
export const ListUsersDocument = gql`
    query listUsers($name: String, $after: String, $limit: Int) {
  users(name: $name, after: $after, limit: $limit) {
    list {
      id
      name
      avatar
      description
    }
    nextToken
  }
}
    `;
export type ListUsersComponentProps = Omit<ApolloReactComponents.QueryComponentOptions<ListUsersQuery, ListUsersQueryVariables>, 'query'>;

    export const ListUsersComponent = (props: ListUsersComponentProps) => (
      <ApolloReactComponents.Query<ListUsersQuery, ListUsersQueryVariables> query={ListUsersDocument} {...props} />
    );
    
export type ListUsersProps<TChildProps = {}, TDataName extends string = 'data'> = {
      [key in TDataName]: ApolloReactHoc.DataValue<ListUsersQuery, ListUsersQueryVariables>
    } & TChildProps;
export function withListUsers<TProps, TChildProps = {}, TDataName extends string = 'data'>(operationOptions?: ApolloReactHoc.OperationOption<
  TProps,
  ListUsersQuery,
  ListUsersQueryVariables,
  ListUsersProps<TChildProps, TDataName>>) {
    return ApolloReactHoc.withQuery<TProps, ListUsersQuery, ListUsersQueryVariables, ListUsersProps<TChildProps, TDataName>>(ListUsersDocument, {
      alias: 'listUsers',
      ...operationOptions
    });
};

/**
 * __useListUsersQuery__
 *
 * To run a query within a React component, call `useListUsersQuery` and pass it any options that fit your needs.
 * When your component renders, `useListUsersQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useListUsersQuery({
 *   variables: {
 *      name: // value for 'name'
 *      after: // value for 'after'
 *      limit: // value for 'limit'
 *   },
 * });
 */
export function useListUsersQuery(baseOptions?: ApolloReactHooks.QueryHookOptions<ListUsersQuery, ListUsersQueryVariables>) {
        return ApolloReactHooks.useQuery<ListUsersQuery, ListUsersQueryVariables>(ListUsersDocument, baseOptions);
      }
export function useListUsersLazyQuery(baseOptions?: ApolloReactHooks.LazyQueryHookOptions<ListUsersQuery, ListUsersQueryVariables>) {
          return ApolloReactHooks.useLazyQuery<ListUsersQuery, ListUsersQueryVariables>(ListUsersDocument, baseOptions);
        }
export type ListUsersQueryHookResult = ReturnType<typeof useListUsersQuery>;
export type ListUsersLazyQueryHookResult = ReturnType<typeof useListUsersLazyQuery>;
export type ListUsersQueryResult = ApolloReactCommon.QueryResult<ListUsersQuery, ListUsersQueryVariables>;
export const GetUserDocument = gql`
    query getUser($id: ID!) {
  user(id: $id) {
    id
    avatar
    name
    description
    latitude
    longitude
    address
  }
}
    `;
export type GetUserComponentProps = Omit<ApolloReactComponents.QueryComponentOptions<GetUserQuery, GetUserQueryVariables>, 'query'> & ({ variables: GetUserQueryVariables; skip?: boolean; } | { skip: boolean; });

    export const GetUserComponent = (props: GetUserComponentProps) => (
      <ApolloReactComponents.Query<GetUserQuery, GetUserQueryVariables> query={GetUserDocument} {...props} />
    );
    
export type GetUserProps<TChildProps = {}, TDataName extends string = 'data'> = {
      [key in TDataName]: ApolloReactHoc.DataValue<GetUserQuery, GetUserQueryVariables>
    } & TChildProps;
export function withGetUser<TProps, TChildProps = {}, TDataName extends string = 'data'>(operationOptions?: ApolloReactHoc.OperationOption<
  TProps,
  GetUserQuery,
  GetUserQueryVariables,
  GetUserProps<TChildProps, TDataName>>) {
    return ApolloReactHoc.withQuery<TProps, GetUserQuery, GetUserQueryVariables, GetUserProps<TChildProps, TDataName>>(GetUserDocument, {
      alias: 'getUser',
      ...operationOptions
    });
};

/**
 * __useGetUserQuery__
 *
 * To run a query within a React component, call `useGetUserQuery` and pass it any options that fit your needs.
 * When your component renders, `useGetUserQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useGetUserQuery({
 *   variables: {
 *      id: // value for 'id'
 *   },
 * });
 */
export function useGetUserQuery(baseOptions?: ApolloReactHooks.QueryHookOptions<GetUserQuery, GetUserQueryVariables>) {
        return ApolloReactHooks.useQuery<GetUserQuery, GetUserQueryVariables>(GetUserDocument, baseOptions);
      }
export function useGetUserLazyQuery(baseOptions?: ApolloReactHooks.LazyQueryHookOptions<GetUserQuery, GetUserQueryVariables>) {
          return ApolloReactHooks.useLazyQuery<GetUserQuery, GetUserQueryVariables>(GetUserDocument, baseOptions);
        }
export type GetUserQueryHookResult = ReturnType<typeof useGetUserQuery>;
export type GetUserLazyQueryHookResult = ReturnType<typeof useGetUserLazyQuery>;
export type GetUserQueryResult = ApolloReactCommon.QueryResult<GetUserQuery, GetUserQueryVariables>;
export const WatchUsersDocument = gql`
    subscription watchUsers {
  userChanged {
    id
    name
    avatar
    description
  }
}
    `;
export type WatchUsersComponentProps = Omit<ApolloReactComponents.SubscriptionComponentOptions<WatchUsersSubscription, WatchUsersSubscriptionVariables>, 'subscription'>;

    export const WatchUsersComponent = (props: WatchUsersComponentProps) => (
      <ApolloReactComponents.Subscription<WatchUsersSubscription, WatchUsersSubscriptionVariables> subscription={WatchUsersDocument} {...props} />
    );
    
export type WatchUsersProps<TChildProps = {}, TDataName extends string = 'data'> = {
      [key in TDataName]: ApolloReactHoc.DataValue<WatchUsersSubscription, WatchUsersSubscriptionVariables>
    } & TChildProps;
export function withWatchUsers<TProps, TChildProps = {}, TDataName extends string = 'data'>(operationOptions?: ApolloReactHoc.OperationOption<
  TProps,
  WatchUsersSubscription,
  WatchUsersSubscriptionVariables,
  WatchUsersProps<TChildProps, TDataName>>) {
    return ApolloReactHoc.withSubscription<TProps, WatchUsersSubscription, WatchUsersSubscriptionVariables, WatchUsersProps<TChildProps, TDataName>>(WatchUsersDocument, {
      alias: 'watchUsers',
      ...operationOptions
    });
};

/**
 * __useWatchUsersSubscription__
 *
 * To run a query within a React component, call `useWatchUsersSubscription` and pass it any options that fit your needs.
 * When your component renders, `useWatchUsersSubscription` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the subscription, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useWatchUsersSubscription({
 *   variables: {
 *   },
 * });
 */
export function useWatchUsersSubscription(baseOptions?: ApolloReactHooks.SubscriptionHookOptions<WatchUsersSubscription, WatchUsersSubscriptionVariables>) {
        return ApolloReactHooks.useSubscription<WatchUsersSubscription, WatchUsersSubscriptionVariables>(WatchUsersDocument, baseOptions);
      }
export type WatchUsersSubscriptionHookResult = ReturnType<typeof useWatchUsersSubscription>;
export type WatchUsersSubscriptionResult = ApolloReactCommon.SubscriptionResult<WatchUsersSubscription>;
export const WatchDeletedUsersDocument = gql`
    subscription watchDeletedUsers {
  userDeleted {
    id
  }
}
    `;
export type WatchDeletedUsersComponentProps = Omit<ApolloReactComponents.SubscriptionComponentOptions<WatchDeletedUsersSubscription, WatchDeletedUsersSubscriptionVariables>, 'subscription'>;

    export const WatchDeletedUsersComponent = (props: WatchDeletedUsersComponentProps) => (
      <ApolloReactComponents.Subscription<WatchDeletedUsersSubscription, WatchDeletedUsersSubscriptionVariables> subscription={WatchDeletedUsersDocument} {...props} />
    );
    
export type WatchDeletedUsersProps<TChildProps = {}, TDataName extends string = 'data'> = {
      [key in TDataName]: ApolloReactHoc.DataValue<WatchDeletedUsersSubscription, WatchDeletedUsersSubscriptionVariables>
    } & TChildProps;
export function withWatchDeletedUsers<TProps, TChildProps = {}, TDataName extends string = 'data'>(operationOptions?: ApolloReactHoc.OperationOption<
  TProps,
  WatchDeletedUsersSubscription,
  WatchDeletedUsersSubscriptionVariables,
  WatchDeletedUsersProps<TChildProps, TDataName>>) {
    return ApolloReactHoc.withSubscription<TProps, WatchDeletedUsersSubscription, WatchDeletedUsersSubscriptionVariables, WatchDeletedUsersProps<TChildProps, TDataName>>(WatchDeletedUsersDocument, {
      alias: 'watchDeletedUsers',
      ...operationOptions
    });
};

/**
 * __useWatchDeletedUsersSubscription__
 *
 * To run a query within a React component, call `useWatchDeletedUsersSubscription` and pass it any options that fit your needs.
 * When your component renders, `useWatchDeletedUsersSubscription` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the subscription, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useWatchDeletedUsersSubscription({
 *   variables: {
 *   },
 * });
 */
export function useWatchDeletedUsersSubscription(baseOptions?: ApolloReactHooks.SubscriptionHookOptions<WatchDeletedUsersSubscription, WatchDeletedUsersSubscriptionVariables>) {
        return ApolloReactHooks.useSubscription<WatchDeletedUsersSubscription, WatchDeletedUsersSubscriptionVariables>(WatchDeletedUsersDocument, baseOptions);
      }
export type WatchDeletedUsersSubscriptionHookResult = ReturnType<typeof useWatchDeletedUsersSubscription>;
export type WatchDeletedUsersSubscriptionResult = ApolloReactCommon.SubscriptionResult<WatchDeletedUsersSubscription>;