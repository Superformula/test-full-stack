/* eslint-disable */
import * as Types from '../../@types/types';

import gql from 'graphql-tag';

export type UserFragment = { __typename?: 'User' } & Pick<
  Types.User,
  'id' | 'name' | 'dob' | 'address' | 'description' | 'createdAt' | 'updatedAt'
>;

export const UserFragmentDoc = gql`
  fragment User on User {
    id
    name
    dob
    address
    description
    createdAt
    updatedAt
  }
`;
