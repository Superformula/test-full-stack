export type Maybe<T> = T | null;
export type Exact<T extends { [key: string]: unknown }> = { [K in keyof T]: T[K] };
export type MakeOptional<T, K extends keyof T> = Omit<T, K> & { [SubKey in K]?: Maybe<T[SubKey]> };
export type MakeMaybe<T, K extends keyof T> = Omit<T, K> & { [SubKey in K]: Maybe<T[SubKey]> };

// Generated online using https://graphql-code-generator.com/

/** All built-in and custom scalars, mapped to their actual values */
export type Scalars = {
  ID: string;
  String: string;
  Boolean: boolean;
  Int: number;
  Float: number;

  /** The `AWSDate` scalar type provided by AWS AppSync, represents a valid ***extended*** [ISO 8601 Date]
   * (https://en.wikipedia.org/wiki/ISO_8601#Calendar_dates) string. In other words, this scalar type accepts date
   * strings of the form `YYYY-MM-DD`.  The scalar can also accept "negative years" of the form `-YYYY` which correspond
   * to years before `0000`. For example, "**-2017-05-01**" and "**-9999-01-01**" are both valid dates.
   * This scalar type can also accept an optional [time zone offset](https://en.wikipedia.org/wiki/ISO_8601#Time_zone_designators).
   * For example, "**1970-01-01**", "**1970-01-01Z**", "**1970-01-01-07:00**" and "**1970-01-01+05:30**" are all valid dates.
   * The time zone offset must either be `Z` (representing the UTC time zone) or be in the format `±hh:mm:ss`. The seconds
   * field in the timezone offset will be considered valid even though it is not part of the ISO 8601 standard. */
  AWSDate: string;

  /** The `AWSTimestamp` scalar type provided by AWS AppSync, represents the number of seconds that have elapsed since
   *  `1970-01-01T00:00Z`. Negative values are also accepted and these represent the number of seconds till
   *  `1970-01-01T00:00Z`.  Timestamps are serialized and deserialized as integers. The minimum supported timestamp
   *  value is **`-31557014167219200`** which corresponds to `-1000000000-01-01T00:00Z`. The maximum supported timestamp
   *  value is **`31556889864403199`** which corresponds to `1000000000-12-31T23:59:59.999999999Z`. */
  AWSTimestamp: number;
};

export type AddressSuggestion = {
  __typename?: 'AddressSuggestion';
  description: Scalars['String'];
  placeId: Scalars['String'];
};

export type Coordinates = {
  __typename?: 'Coordinates';
  latitude: Scalars['Float'];
  longitude: Scalars['Float'];
};

export type User = {
  __typename?: 'User';
  address: Scalars['String'];
  avatar: Scalars['String'];
  createdAt: Scalars['AWSTimestamp'];
  description: Scalars['String'];
  dob: Scalars['AWSDate'];
  id: Scalars['ID'];
  latitude: Scalars['Float'];
  longitude: Scalars['Float'];
  name: Scalars['String'];
  updatedAt: Scalars['AWSTimestamp'];
};

export type GetAllUsersResult = {
  __typename?: 'GetAllUsersResult';
  items: Array<User>;
  nextToken?: Maybe<Scalars['String']>;
};

export type Mutation = {
  __typename?: 'Mutation';
  createUser: User;
  deleteUser: User;
  updateUser: User;
};

export type MutationCreateUserArgs = {
  input: UserInput;
};

export type MutationDeleteUserArgs = {
  id: Scalars['ID'];
};

export type MutationUpdateUserArgs = {
  id: Scalars['ID'];
  input: UserInput;
};

export type Query = {
  __typename?: 'Query';
  getAddresses: Array<AddressSuggestion>;
  /**  TODO: Remove this once I plug elastic search in. I will use this just for debugging purposes */
  getAllUsers?: Maybe<GetAllUsersResult>;
  getCoordinates: Coordinates;
  getUserById?: Maybe<User>;
  searchUsers?: Maybe<UserSearchResult>;
};

export type QueryGetAddressesArgs = {
  input: Scalars['String'];
};

export type QueryGetCoordinatesArgs = {
  placeId: Scalars['String'];
};

export type QueryGetUserByIdArgs = {
  id: Scalars['ID'];
};

export type QuerySearchUsersArgs = {
  limit?: Maybe<Scalars['Int']>;
  name?: Maybe<Scalars['String']>;
  skip?: Maybe<Scalars['Int']>;
};

export type Subscription = {
  __typename?: 'Subscription';
  onCreateUser?: Maybe<User>;
  onDeleteUser?: Maybe<User>;
  onUpdateUser?: Maybe<User>;
};

export type UserSearchResult = {
  __typename?: 'UserSearchResult';
  hasMore: Scalars['Boolean'];
  items: Array<User>;
};

export type CoordinatesInput = {
  latitude: Scalars['Float'];
  longitude: Scalars['Float'];
};

export type UserInput = {
  address: Scalars['String'];
  description: Scalars['String'];
  dob: Scalars['AWSDate'];
  location: CoordinatesInput;
  name: Scalars['String'];
};
