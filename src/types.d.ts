export type Maybe<T> = T | null;
export type Exact<T extends { [key: string]: unknown }> = { [K in keyof T]: T[K] };
export type MakeOptional<T, K extends keyof T> = Omit<T, K> & { [SubKey in K]?: Maybe<T[SubKey]> };
export type MakeMaybe<T, K extends keyof T> = Omit<T, K> & { [SubKey in K]: Maybe<T[SubKey]> };
/** All built-in and custom scalars, mapped to their actual values */
export type Scalars = {
  ID: string;
  String: string;
  Boolean: boolean;
  Int: number;
  Float: number;
  /** The `Upload` scalar type represents a file upload. */
  Upload: any;
};


export enum CacheControlScope {
  Public = 'PUBLIC',
  Private = 'PRIVATE'
}

export type CreateUserInput = {
  name: Scalars['String'];
  dob: Scalars['String'];
  address: Scalars['String'];
  description: Scalars['String'];
  imageUrl: Scalars['String'];
};

export type DeleteUserInput = {
  id: Scalars['String'];
};

export type Geocoding = {
  __typename?: 'Geocoding';
  features: Array<GeocodingFeature>;
};

export type GeocodingFeature = {
  __typename?: 'GeocodingFeature';
  place_name: Scalars['String'];
  geometry: GeocodingFeatureGeometry;
};

export type GeocodingFeatureGeometry = {
  __typename?: 'GeocodingFeatureGeometry';
  coordinates: Array<Scalars['Float']>;
};

export type Mutation = {
  __typename?: 'Mutation';
  /**
   * Create a new user, there are some validations.:
   * 1. Date of birth should follow the American format: MM-DD-YYYY and it should be today or before.
   * 2. It also validates the imageUrl.
   *
   * Mutation will also add the current date to createdAt field
   */
  createUser?: Maybe<User>;
  /**
   * Update a new user, there are some validations.:
   * 1. Date of birth should follow the American date format: MM-DD-YYYY and it should be today or before.
   * 2. Image URL should be a valid URL.
   *
   * Mutation will also add the current date to updatedAt field
   */
  updateUser?: Maybe<User>;
  /**
   * Delete a new user, this is a soft delete, it will only update the deletedAt value and it will now show up
   * on search queries.
   *
   * Mutation will also add the current date to deletedAt field
   */
  deleteUser?: Maybe<User>;
};


export type MutationCreateUserArgs = {
  input: CreateUserInput;
};


export type MutationUpdateUserArgs = {
  input: UpdateUserInput;
};


export type MutationDeleteUserArgs = {
  input: DeleteUserInput;
};

export type PageInfo = {
  __typename?: 'PageInfo';
  startCursor?: Maybe<Scalars['String']>;
  endCursor?: Maybe<Scalars['String']>;
  hasNextPage: Scalars['Boolean'];
  hasPreviousPage: Scalars['Boolean'];
};

export type Query = {
  __typename?: 'Query';
  /** Return a User object */
  user?: Maybe<User>;
  /** Returns a list of User object, does not include users that have deletedAt value set */
  users: UsersSearch;
  /**
   * Search a user by its name, for now, it is only possible to query by one name eg.:
   * The user has the name Marcelo Aleixo, the query will only return if searched for marcelo or aleixo, it will ignore the case.
   * This also does not include users that have deletedAt value set
   */
  usersByName: UsersSearch;
  /**
   * Accepts an address and will return the geolocation, this is using the mapbox to retrieve the values.
   * Eg. of addresses:
   *   - Seattle, Washington
   *   - Digital Nomad
   *   - New Jersey
   *   - Northern Bergen County, NJ
   *
   * To use this query it is necessary to have the API TOKEN already set in the API Secrets Manager!
   */
  geocoding?: Maybe<Geocoding>;
};


export type QueryUserArgs = {
  id: Scalars['ID'];
};


export type QueryUsersArgs = {
  first: Scalars['Int'];
  after?: Maybe<Scalars['String']>;
  name?: Maybe<Scalars['String']>;
};


export type QueryUsersByNameArgs = {
  first: Scalars['Int'];
  after?: Maybe<Scalars['String']>;
  name: Scalars['String'];
};


export type QueryGeocodingArgs = {
  address: Scalars['String'];
};

export type UpdateUserInput = {
  id: Scalars['String'];
  name: Scalars['String'];
  dob: Scalars['String'];
  address: Scalars['String'];
  description: Scalars['String'];
  imageUrl: Scalars['String'];
};


/** User Object */
export type User = {
  __typename?: 'User';
  /** Computed Value, will be added on user create, the value is a hash */
  id: Scalars['String'];
  name: Scalars['String'];
  /**
   * Computed value, it will be added/updates using the name as parameter, it will apply lower case
   * and also replace space with underscore
   */
  nameNormalized: Scalars['String'];
  /** This field must follow the American date format: MM-DD-YYYY */
  dob: Scalars['String'];
  address: Scalars['String'];
  description: Scalars['String'];
  /** Computed Value, will be added at user creation */
  createdAt: Scalars['String'];
  /** Computed Value, will be added at user update */
  updatedAt: Scalars['String'];
  /** Computed Value, will be added at user delete */
  deletedAt: Scalars['String'];
  imageUrl: Scalars['String'];
};

export type UserEdge = {
  __typename?: 'UserEdge';
  node: User;
  cursor: Scalars['String'];
};

export type UsersSearch = {
  __typename?: 'UsersSearch';
  edges: Array<UserEdge>;
  pageInfo: PageInfo;
};
