import { gql } from '@apollo/client';
import { UserSearchResult } from './types';

export type SearchUserResponseData = {
  searchUsers: UserSearchResult;
};

export const SEARCH_USER_GQL = gql`
  query searchUser($name: String) {
    searchUsers(name: $name) {
      hasMore
      items {
        id
        name
        dob
        address
        description
        latitude
        longitude
        avatar
        updatedAt
        createdAt
      }
    }
  }
`;
