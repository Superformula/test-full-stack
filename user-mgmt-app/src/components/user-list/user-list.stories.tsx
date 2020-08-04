import React from 'react';
import { UserList as UserListComponent } from './index';
import users from 'test/User.json';

export default {
  title: 'UserList',
  component: UserListComponent,
};

export const UserList = () => {
  return (
    <div
      style={{ width: 1800, height: 1600, background: ' #F8F8F8', padding: 20 }}
    >
      <UserListComponent users={users} />
    </div>
  );
};
