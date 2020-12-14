import React, { useEffect } from 'react';
import { gql, useApolloClient, useLazyQuery } from '@apollo/client';
import { QuerySearchUsersArgs, User, UserSearchResult } from '../api/types';
import UserList from './UserList/UserList';

const UsersPage: React.FC = () => {
  console.log('stop collapsing me');

  return <UserList />;
};
export default UsersPage;
