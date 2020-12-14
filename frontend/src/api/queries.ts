import { gql } from '@apollo/client';
import { Scalars, User, UserSearchResult } from './types';

export type SearchUserResponseData = {
  searchUsers: UserSearchListResult;
};

export type UserSearchListResult = {
  hasMore: boolean;
  items: UserListItem[];
};

export type UserListItem = {
  id: string;
  name: string;
  description: string;
  avatar: string;
  createdAt: number;
};

export const USER_SEARCH_LIST_GQL = gql`
  query searchUser($name: String, $skip: Int) {
    searchUsers(name: $name, skip: $skip) {
      hasMore
      items {
        id
        name
        avatar
        description
        createdAt
      }
    }
  }
`;
