import React from 'react';
import { User } from '../../../types';
import UserCard from './UserCard/UserCard';
import './UserList.scss';

interface UserListProps {
  users?: User[]
}

const UserList: React.FC<UserListProps> = ({ users }) => (
  <div className="user-list">
    {users?.map((user) => (
      <UserCard key={user.id} user={user} />
    ))}
  </div>
);

export default React.memo(UserList);
