import { text } from '@storybook/addon-knobs';
import React from 'react';
import { UserCard as UserCardComponent } from './index';

export default {
  title: 'UserCard',
  component: UserCardComponent,
};

export const UserCard = () => {
  return (
    <div
      style={{ width: 1800, height: 1600, background: ' #F8F8F8', padding: 20 }}
    >
      <UserCardComponent
        imageUrl="https://source.unsplash.com/random/168x168/?headshot&idx=1"
        userName={text('User Name', 'Joe Schmo')}
        userDescription={text('User Description', 'This is an example user')}
      />
    </div>
  );
};
