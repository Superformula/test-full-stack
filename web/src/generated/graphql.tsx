import gql from 'graphql-tag';
import * as ApolloReactCommon from '@apollo/react-common';
import * as React from 'react';
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
  person?: Maybe<Person>;
  persons: PersonConnection;
};


export type QueryPersonArgs = {
  id: Scalars['ID'];
};


export type QueryPersonsArgs = {
  name?: Maybe<Scalars['String']>;
  after?: Maybe<Scalars['String']>;
};

export type Person = {
  __typename?: 'Person';
  id: Scalars['ID'];
  avatar: Scalars['String'];
  name: Scalars['String'];
  dob?: Maybe<Scalars['AWSDate']>;
  address: Scalars['String'];
  lat?: Maybe<Scalars['Float']>;
  lng?: Maybe<Scalars['Float']>;
  description?: Maybe<Scalars['String']>;
  createdAt: Scalars['AWSDateTime'];
  updatedAt: Scalars['AWSDateTime'];
};



export type PersonConnection = {
  __typename?: 'PersonConnection';
  list: Array<Person>;
  nextToken?: Maybe<Scalars['String']>;
};

export type Mutation = {
  __typename?: 'Mutation';
  createPerson: Person;
  updatePerson: Person;
  deletePerson: Person;
};


export type MutationCreatePersonArgs = {
  body: PersonRequest;
};


export type MutationUpdatePersonArgs = {
  id: Scalars['ID'];
  body: PersonRequest;
};


export type MutationDeletePersonArgs = {
  id: Scalars['ID'];
};

export type PersonRequest = {
  name: Scalars['String'];
  dob?: Maybe<Scalars['AWSDate']>;
  address: Scalars['String'];
  lat?: Maybe<Scalars['Float']>;
  lng?: Maybe<Scalars['Float']>;
  description?: Maybe<Scalars['String']>;
};

export type Subscription = {
  __typename?: 'Subscription';
  personChanged?: Maybe<Person>;
};

export type CreatePersonMutationVariables = Exact<{
  body: PersonRequest;
}>;


export type CreatePersonMutation = (
  { __typename?: 'Mutation' }
  & { createPerson: (
    { __typename?: 'Person' }
    & Pick<Person, 'id' | 'name' | 'avatar' | 'description'>
  ) }
);

export type ListPersonsQueryVariables = Exact<{
  name?: Maybe<Scalars['String']>;
  after?: Maybe<Scalars['String']>;
}>;


export type ListPersonsQuery = (
  { __typename?: 'Query' }
  & { persons: (
    { __typename?: 'PersonConnection' }
    & Pick<PersonConnection, 'nextToken'>
    & { list: Array<(
      { __typename?: 'Person' }
      & Pick<Person, 'id' | 'name' | 'avatar' | 'description'>
    )> }
  ) }
);

export type GetPersonQueryVariables = Exact<{
  id: Scalars['ID'];
}>;


export type GetPersonQuery = (
  { __typename?: 'Query' }
  & { person?: Maybe<(
    { __typename?: 'Person' }
    & Pick<Person, 'id' | 'avatar' | 'name' | 'description' | 'lat' | 'lng' | 'address'>
  )> }
);

export type WatchPersonsSubscriptionVariables = Exact<{ [key: string]: never; }>;


export type WatchPersonsSubscription = (
  { __typename?: 'Subscription' }
  & { personChanged?: Maybe<(
    { __typename?: 'Person' }
    & Pick<Person, 'id' | 'name' | 'avatar' | 'description'>
  )> }
);


export const CreatePersonDocument = gql`
    mutation createPerson($body: PersonRequest!) {
  createPerson(body: $body) {
    id
    name
    avatar
    description
  }
}
    `;
export type CreatePersonMutationFn = ApolloReactCommon.MutationFunction<CreatePersonMutation, CreatePersonMutationVariables>;
export type CreatePersonComponentProps = Omit<ApolloReactComponents.MutationComponentOptions<CreatePersonMutation, CreatePersonMutationVariables>, 'mutation'>;

    export const CreatePersonComponent = (props: CreatePersonComponentProps) => (
      <ApolloReactComponents.Mutation<CreatePersonMutation, CreatePersonMutationVariables> mutation={CreatePersonDocument} {...props} />
    );
    
export type CreatePersonProps<TChildProps = {}, TDataName extends string = 'mutate'> = {
      [key in TDataName]: ApolloReactCommon.MutationFunction<CreatePersonMutation, CreatePersonMutationVariables>
    } & TChildProps;
export function withCreatePerson<TProps, TChildProps = {}, TDataName extends string = 'mutate'>(operationOptions?: ApolloReactHoc.OperationOption<
  TProps,
  CreatePersonMutation,
  CreatePersonMutationVariables,
  CreatePersonProps<TChildProps, TDataName>>) {
    return ApolloReactHoc.withMutation<TProps, CreatePersonMutation, CreatePersonMutationVariables, CreatePersonProps<TChildProps, TDataName>>(CreatePersonDocument, {
      alias: 'createPerson',
      ...operationOptions
    });
};

/**
 * __useCreatePersonMutation__
 *
 * To run a mutation, you first call `useCreatePersonMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useCreatePersonMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [createPersonMutation, { data, loading, error }] = useCreatePersonMutation({
 *   variables: {
 *      body: // value for 'body'
 *   },
 * });
 */
export function useCreatePersonMutation(baseOptions?: ApolloReactHooks.MutationHookOptions<CreatePersonMutation, CreatePersonMutationVariables>) {
        return ApolloReactHooks.useMutation<CreatePersonMutation, CreatePersonMutationVariables>(CreatePersonDocument, baseOptions);
      }
export type CreatePersonMutationHookResult = ReturnType<typeof useCreatePersonMutation>;
export type CreatePersonMutationResult = ApolloReactCommon.MutationResult<CreatePersonMutation>;
export type CreatePersonMutationOptions = ApolloReactCommon.BaseMutationOptions<CreatePersonMutation, CreatePersonMutationVariables>;
export const ListPersonsDocument = gql`
    query listPersons($name: String, $after: String) {
  persons(name: $name, after: $after) {
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
export type ListPersonsComponentProps = Omit<ApolloReactComponents.QueryComponentOptions<ListPersonsQuery, ListPersonsQueryVariables>, 'query'>;

    export const ListPersonsComponent = (props: ListPersonsComponentProps) => (
      <ApolloReactComponents.Query<ListPersonsQuery, ListPersonsQueryVariables> query={ListPersonsDocument} {...props} />
    );
    
export type ListPersonsProps<TChildProps = {}, TDataName extends string = 'data'> = {
      [key in TDataName]: ApolloReactHoc.DataValue<ListPersonsQuery, ListPersonsQueryVariables>
    } & TChildProps;
export function withListPersons<TProps, TChildProps = {}, TDataName extends string = 'data'>(operationOptions?: ApolloReactHoc.OperationOption<
  TProps,
  ListPersonsQuery,
  ListPersonsQueryVariables,
  ListPersonsProps<TChildProps, TDataName>>) {
    return ApolloReactHoc.withQuery<TProps, ListPersonsQuery, ListPersonsQueryVariables, ListPersonsProps<TChildProps, TDataName>>(ListPersonsDocument, {
      alias: 'listPersons',
      ...operationOptions
    });
};

/**
 * __useListPersonsQuery__
 *
 * To run a query within a React component, call `useListPersonsQuery` and pass it any options that fit your needs.
 * When your component renders, `useListPersonsQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useListPersonsQuery({
 *   variables: {
 *      name: // value for 'name'
 *      after: // value for 'after'
 *   },
 * });
 */
export function useListPersonsQuery(baseOptions?: ApolloReactHooks.QueryHookOptions<ListPersonsQuery, ListPersonsQueryVariables>) {
        return ApolloReactHooks.useQuery<ListPersonsQuery, ListPersonsQueryVariables>(ListPersonsDocument, baseOptions);
      }
export function useListPersonsLazyQuery(baseOptions?: ApolloReactHooks.LazyQueryHookOptions<ListPersonsQuery, ListPersonsQueryVariables>) {
          return ApolloReactHooks.useLazyQuery<ListPersonsQuery, ListPersonsQueryVariables>(ListPersonsDocument, baseOptions);
        }
export type ListPersonsQueryHookResult = ReturnType<typeof useListPersonsQuery>;
export type ListPersonsLazyQueryHookResult = ReturnType<typeof useListPersonsLazyQuery>;
export type ListPersonsQueryResult = ApolloReactCommon.QueryResult<ListPersonsQuery, ListPersonsQueryVariables>;
export const GetPersonDocument = gql`
    query getPerson($id: ID!) {
  person(id: $id) {
    id
    avatar
    name
    description
    lat
    lng
    address
  }
}
    `;
export type GetPersonComponentProps = Omit<ApolloReactComponents.QueryComponentOptions<GetPersonQuery, GetPersonQueryVariables>, 'query'> & ({ variables: GetPersonQueryVariables; skip?: boolean; } | { skip: boolean; });

    export const GetPersonComponent = (props: GetPersonComponentProps) => (
      <ApolloReactComponents.Query<GetPersonQuery, GetPersonQueryVariables> query={GetPersonDocument} {...props} />
    );
    
export type GetPersonProps<TChildProps = {}, TDataName extends string = 'data'> = {
      [key in TDataName]: ApolloReactHoc.DataValue<GetPersonQuery, GetPersonQueryVariables>
    } & TChildProps;
export function withGetPerson<TProps, TChildProps = {}, TDataName extends string = 'data'>(operationOptions?: ApolloReactHoc.OperationOption<
  TProps,
  GetPersonQuery,
  GetPersonQueryVariables,
  GetPersonProps<TChildProps, TDataName>>) {
    return ApolloReactHoc.withQuery<TProps, GetPersonQuery, GetPersonQueryVariables, GetPersonProps<TChildProps, TDataName>>(GetPersonDocument, {
      alias: 'getPerson',
      ...operationOptions
    });
};

/**
 * __useGetPersonQuery__
 *
 * To run a query within a React component, call `useGetPersonQuery` and pass it any options that fit your needs.
 * When your component renders, `useGetPersonQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useGetPersonQuery({
 *   variables: {
 *      id: // value for 'id'
 *   },
 * });
 */
export function useGetPersonQuery(baseOptions?: ApolloReactHooks.QueryHookOptions<GetPersonQuery, GetPersonQueryVariables>) {
        return ApolloReactHooks.useQuery<GetPersonQuery, GetPersonQueryVariables>(GetPersonDocument, baseOptions);
      }
export function useGetPersonLazyQuery(baseOptions?: ApolloReactHooks.LazyQueryHookOptions<GetPersonQuery, GetPersonQueryVariables>) {
          return ApolloReactHooks.useLazyQuery<GetPersonQuery, GetPersonQueryVariables>(GetPersonDocument, baseOptions);
        }
export type GetPersonQueryHookResult = ReturnType<typeof useGetPersonQuery>;
export type GetPersonLazyQueryHookResult = ReturnType<typeof useGetPersonLazyQuery>;
export type GetPersonQueryResult = ApolloReactCommon.QueryResult<GetPersonQuery, GetPersonQueryVariables>;
export const WatchPersonsDocument = gql`
    subscription watchPersons {
  personChanged {
    id
    name
    avatar
    description
  }
}
    `;
export type WatchPersonsComponentProps = Omit<ApolloReactComponents.SubscriptionComponentOptions<WatchPersonsSubscription, WatchPersonsSubscriptionVariables>, 'subscription'>;

    export const WatchPersonsComponent = (props: WatchPersonsComponentProps) => (
      <ApolloReactComponents.Subscription<WatchPersonsSubscription, WatchPersonsSubscriptionVariables> subscription={WatchPersonsDocument} {...props} />
    );
    
export type WatchPersonsProps<TChildProps = {}, TDataName extends string = 'data'> = {
      [key in TDataName]: ApolloReactHoc.DataValue<WatchPersonsSubscription, WatchPersonsSubscriptionVariables>
    } & TChildProps;
export function withWatchPersons<TProps, TChildProps = {}, TDataName extends string = 'data'>(operationOptions?: ApolloReactHoc.OperationOption<
  TProps,
  WatchPersonsSubscription,
  WatchPersonsSubscriptionVariables,
  WatchPersonsProps<TChildProps, TDataName>>) {
    return ApolloReactHoc.withSubscription<TProps, WatchPersonsSubscription, WatchPersonsSubscriptionVariables, WatchPersonsProps<TChildProps, TDataName>>(WatchPersonsDocument, {
      alias: 'watchPersons',
      ...operationOptions
    });
};

/**
 * __useWatchPersonsSubscription__
 *
 * To run a query within a React component, call `useWatchPersonsSubscription` and pass it any options that fit your needs.
 * When your component renders, `useWatchPersonsSubscription` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the subscription, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useWatchPersonsSubscription({
 *   variables: {
 *   },
 * });
 */
export function useWatchPersonsSubscription(baseOptions?: ApolloReactHooks.SubscriptionHookOptions<WatchPersonsSubscription, WatchPersonsSubscriptionVariables>) {
        return ApolloReactHooks.useSubscription<WatchPersonsSubscription, WatchPersonsSubscriptionVariables>(WatchPersonsDocument, baseOptions);
      }
export type WatchPersonsSubscriptionHookResult = ReturnType<typeof useWatchPersonsSubscription>;
export type WatchPersonsSubscriptionResult = ApolloReactCommon.SubscriptionResult<WatchPersonsSubscription>;