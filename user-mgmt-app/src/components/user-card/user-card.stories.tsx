import React from 'react';
import { UserCard as UserCardComponent } from './index';
import users from 'test/User.json';

export default {
  title: 'UserCard',
  component: UserCardComponent,
};

const user = users[5];

export const UserCard = () => {
  return (
    <div
      style={{ width: 1800, height: 1600, background: ' #F8F8F8', padding: 20 }}
    >
      <UserCardComponent
        imageUrl="https://source.unsplash.com/random/168x168/?headshot&idx=1"
        user={user}
        onEdit={(user) => {
          alert(`User edit invoked ${JSON.stringify(user)}`);
        }}
      />
    </div>
  );
};
