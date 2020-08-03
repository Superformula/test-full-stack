/* eslint-disable */
import * as Types from '../../@types/types';

import { UserFragment } from '../../fragments/generated/user-fragment';
import { PagedUserResultFragment } from '../../fragments/generated/page-fragment';
import { GeocodeResultFragment } from '../../fragments/generated/geocode-result-fragment';
import gql from 'graphql-tag';
import { UserFragmentDoc } from '../../fragments/generated/user-fragment';
import { PagedUserResultFragmentDoc } from '../../fragments/generated/page-fragment';
import { GeocodeResultFragmentDoc } from '../../fragments/generated/geocode-result-fragment';
import * as ApolloReactCommon from '@apollo/client';
import * as ApolloReactHooks from '@apollo/client';

export type UserQueryVariables = Types.Exact<{
  id: Types.Scalars['String'];
}>;

export type UserQuery = { __typename?: 'Query' } & {
  user?: Types.Maybe<{ __typename?: 'User' } & UserFragment>;
};

export type UsersQueryVariables = Types.Exact<{
  searchCriteria?: Types.Maybe<Types.UserSearchCriteria>;
  pageRequest?: Types.Maybe<Types.PageRequest>;
}>;

export type UsersQuery = { __typename?: 'Query' } & {
  users: { __typename?: 'PagedUserResult' } & PagedUserResultFragment;
};

export type GeocodeQueryVariables = Types.Exact<{
  geocodeInput: Types.GeocodeInput;
}>;

export type GeocodeQuery = { __typename?: 'Query' } & {
  geocode: { __typename?: 'GeocodeResult' } & GeocodeResultFragment;
};

export const UserDocument = gql`
  query User($id: String!) {
    user(id: $id) {
      ...User
    }
  }
  ${UserFragmentDoc}
`;

/**
 * __useUserQuery__
 *
 * To run a query within a React component, call `useUserQuery` and pass it any options that fit your needs.
 * When your component renders, `useUserQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useUserQuery({
 *   variables: {
 *      id: // value for 'id'
 *   },
 * });
 */
export function useUserQuery(
  baseOptions?: ApolloReactHooks.QueryHookOptions<UserQuery, UserQueryVariables>
) {
  return ApolloReactHooks.useQuery<UserQuery, UserQueryVariables>(
    UserDocument,
    baseOptions
  );
}
export function useUserLazyQuery(
  baseOptions?: ApolloReactHooks.LazyQueryHookOptions<
    UserQuery,
    UserQueryVariables
  >
) {
  return ApolloReactHooks.useLazyQuery<UserQuery, UserQueryVariables>(
    UserDocument,
    baseOptions
  );
}
export type UserQueryHookResult = ReturnType<typeof useUserQuery>;
export type UserLazyQueryHookResult = ReturnType<typeof useUserLazyQuery>;
export type UserQueryResult = ApolloReactCommon.QueryResult<
  UserQuery,
  UserQueryVariables
>;
export const UsersDocument = gql`
  query Users($searchCriteria: UserSearchCriteria, $pageRequest: PageRequest) {
    users(searchCriteria: $searchCriteria, pageRequest: $pageRequest) {
      ...PagedUserResult
    }
  }
  ${PagedUserResultFragmentDoc}
`;

/**
 * __useUsersQuery__
 *
 * To run a query within a React component, call `useUsersQuery` and pass it any options that fit your needs.
 * When your component renders, `useUsersQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useUsersQuery({
 *   variables: {
 *      searchCriteria: // value for 'searchCriteria'
 *      pageRequest: // value for 'pageRequest'
 *   },
 * });
 */
export function useUsersQuery(
  baseOptions?: ApolloReactHooks.QueryHookOptions<
    UsersQuery,
    UsersQueryVariables
  >
) {
  return ApolloReactHooks.useQuery<UsersQuery, UsersQueryVariables>(
    UsersDocument,
    baseOptions
  );
}
export function useUsersLazyQuery(
  baseOptions?: ApolloReactHooks.LazyQueryHookOptions<
    UsersQuery,
    UsersQueryVariables
  >
) {
  return ApolloReactHooks.useLazyQuery<UsersQuery, UsersQueryVariables>(
    UsersDocument,
    baseOptions
  );
}
export type UsersQueryHookResult = ReturnType<typeof useUsersQuery>;
export type UsersLazyQueryHookResult = ReturnType<typeof useUsersLazyQuery>;
export type UsersQueryResult = ApolloReactCommon.QueryResult<
  UsersQuery,
  UsersQueryVariables
>;
export const GeocodeDocument = gql`
  query Geocode($geocodeInput: GeocodeInput!) {
    geocode(geocodeInput: $geocodeInput) {
      ...GeocodeResult
    }
  }
  ${GeocodeResultFragmentDoc}
`;

/**
 * __useGeocodeQuery__
 *
 * To run a query within a React component, call `useGeocodeQuery` and pass it any options that fit your needs.
 * When your component renders, `useGeocodeQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useGeocodeQuery({
 *   variables: {
 *      geocodeInput: // value for 'geocodeInput'
 *   },
 * });
 */
export function useGeocodeQuery(
  baseOptions?: ApolloReactHooks.QueryHookOptions<
    GeocodeQuery,
    GeocodeQueryVariables
  >
) {
  return ApolloReactHooks.useQuery<GeocodeQuery, GeocodeQueryVariables>(
    GeocodeDocument,
    baseOptions
  );
}
export function useGeocodeLazyQuery(
  baseOptions?: ApolloReactHooks.LazyQueryHookOptions<
    GeocodeQuery,
    GeocodeQueryVariables
  >
) {
  return ApolloReactHooks.useLazyQuery<GeocodeQuery, GeocodeQueryVariables>(
    GeocodeDocument,
    baseOptions
  );
}
export type GeocodeQueryHookResult = ReturnType<typeof useGeocodeQuery>;
export type GeocodeLazyQueryHookResult = ReturnType<typeof useGeocodeLazyQuery>;
export type GeocodeQueryResult = ApolloReactCommon.QueryResult<
  GeocodeQuery,
  GeocodeQueryVariables
>;
