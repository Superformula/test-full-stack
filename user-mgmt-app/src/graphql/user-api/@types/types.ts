/* eslint-disable */
export type Maybe<T> = T | null;
export type Exact<T extends { [key: string]: unknown }> = {
  [K in keyof T]: T[K];
};
/** All built-in and custom scalars, mapped to their actual values */
export type Scalars = {
  ID: string;
  String: string;
  Boolean: boolean;
  Int: number;
  Float: number;
  /** Time-less local date in ISO 8601 format */
  LocalDate: any;
  /** The javascript `Date` as string. Type represents date and time as the ISO Date string. */
  DateTime: any;
};

export type Query = {
  __typename?: 'Query';
  /** Find users optionally by name filter and page specification */
  users: PagedUserResult;
  /** Find a user by id */
  user?: Maybe<User>;
  /** Geocode an address */
  geocode: GeocodeResult;
};

export type QueryUsersArgs = {
  pageRequest?: Maybe<PageRequest>;
  searchCriteria?: Maybe<UserSearchCriteria>;
};

export type QueryUserArgs = {
  id: Scalars['String'];
};

export type QueryGeocodeArgs = {
  geocodeInput: GeocodeInput;
};

/** Page of User data */
export type PagedUserResult = {
  __typename?: 'PagedUserResult';
  values: Array<User>;
  /** true if this is the last page of data, false otherwise */
  isLastPage: Scalars['Boolean'];
  /** Number of results found for the page request */
  count: Scalars['Int'];
  /** Cursor value to utilize while resuming fetch of paginated data. */
  cursor?: Maybe<Scalars['String']>;
};

/** Object that represents a user */
export type User = {
  __typename?: 'User';
  /** User name */
  name: Scalars['String'];
  /** User date of birth - ISO 8601 format */
  dob: Scalars['LocalDate'];
  /** User address */
  address: Scalars['String'];
  /** User description */
  description: Scalars['String'];
  /** User id */
  id: Scalars['String'];
  /** Created at timestamp - ISO 8601 format */
  createdAt: Scalars['DateTime'];
  /** Updated timestamp - ISO 8601 format */
  updatedAt: Scalars['DateTime'];
};

/** Object that represents a page request */
export type PageRequest = {
  /** Maximum number of results requested in a page */
  limit: Scalars['Int'];
  /** Cursor value to utilize while resuming fetch of paginated data. */
  cursor?: Maybe<Scalars['String']>;
};

/** Object that represents user search criteria */
export type UserSearchCriteria = {
  /** Filter on partial or full user name */
  nameFilter?: Maybe<Scalars['String']>;
};

/** Object that represents a geocoding result */
export type GeocodeResult = {
  __typename?: 'GeocodeResult';
  /** Latitude */
  latitude?: Maybe<Scalars['String']>;
  /** Longitude */
  longitude?: Maybe<Scalars['String']>;
  /** Error during geocoding attempt - null if no errors */
  error?: Maybe<Scalars['String']>;
};

/** Object that represents geocoding request */
export type GeocodeInput = {
  /** Address to geocode */
  address: Scalars['String'];
};

export type Mutation = {
  __typename?: 'Mutation';
  /** Create a user */
  createUser: User;
  /** Update a user */
  updateUser: User;
  /** Delete a user */
  deleteUser: ScalarBooleanResult;
};

export type MutationCreateUserArgs = {
  createUserInput: CreateUserInput;
};

export type MutationUpdateUserArgs = {
  updateUserInput: UpdateUserInput;
};

export type MutationDeleteUserArgs = {
  id: Scalars['String'];
};

/** Object that represents a user creation request */
export type CreateUserInput = {
  /** User name */
  name: Scalars['String'];
  /** User date of birth - ISO 8601 format */
  dob: Scalars['LocalDate'];
  /** User address */
  address: Scalars['String'];
  /** User description */
  description: Scalars['String'];
};

/** Object that represents a user update request */
export type UpdateUserInput = {
  /** User name */
  name: Scalars['String'];
  /** User date of birth - ISO 8601 format */
  dob: Scalars['LocalDate'];
  /** User address */
  address: Scalars['String'];
  /** User description */
  description: Scalars['String'];
  /** User id */
  id: Scalars['String'];
};

export type ScalarBooleanResult = {
  __typename?: 'ScalarBooleanResult';
  value: Scalars['Boolean'];
};
