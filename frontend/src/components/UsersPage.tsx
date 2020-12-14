import React, { useEffect } from 'react';
import { gql, useApolloClient, useLazyQuery } from '@apollo/client';
import { QuerySearchUsersArgs, User, UserSearchResult } from '../api/types';
import UserList from './UserList/UserList';

const onUpdateUser = gql`
  subscription {
    onUpdateUser {
      id
      name
      dob
      description
      longitude
      latitude
      updatedAt
      createdAt
      avatar
      address
    }
  }
`;

const UsersPage: React.FC = () => {
  const apolloClient = useApolloClient();

  // TODO: Move subscriptions to a hook that will update redux
  useEffect(() => {
    const subscription = apolloClient
      .subscribe({
        fetchPolicy: 'no-cache',
        query: onUpdateUser,
      })
      .subscribe({
        next(value) {
          if (!value.data.onUpdateUser) return;

          const updated: User = value.data.onUpdateUser;
          console.log('Update received', updated);
        },
      });

    return () => {
      subscription.unsubscribe();
    };
  }, []);

  return <UserList />;
};

export default UsersPage;
