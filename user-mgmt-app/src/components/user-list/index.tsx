import { UserCard } from 'components/user-card';
import {
  UserCardContainer,
  UserListContainer,
} from 'components/user-list/styles';
import React from 'react';
import { User } from 'graphql/user-api/@types/types';

export interface UserListProps {
  users: User[];
}

const UserListComponent: React.FC<UserListProps> = ({ users }) => {
  const handleOnEdit = () => {};

  const userCards = users.map((user, index) => (
    <UserCardContainer>
      <UserCard
        userName={user.name}
        userDescription={user.description}
        imageUrl={`https://source.unsplash.com/random/168x168/??face${index}`}
        onEdit={handleOnEdit}
      />
    </UserCardContainer>
  ));

  return <UserListContainer>{userCards}</UserListContainer>;
};

export const UserList = UserListComponent;
