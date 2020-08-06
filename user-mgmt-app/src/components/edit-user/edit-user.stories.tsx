import { ApolloProvider } from '@apollo/client';
import { boolean } from '@storybook/addon-knobs';
import { EditUser as EditUserComponent } from 'components/edit-user';
import { buildApolloClient } from 'graphql/apollo-util';
import { User } from 'graphql/user-api/@types';
import React from 'react';
import users from 'test/User.json';

export default {
  title: 'EditUser',
  component: EditUserComponent,
};

const user: User = users[0];

const apolloClient = buildApolloClient();

export const Modal = () => {
  return (
    <ApolloProvider client={apolloClient}>
      <EditUserComponent
        user={user}
        visible={boolean('Visible', true)}
        onClose={(updatedUser?: User) => {
          if (updatedUser) {
            alert(
              `User updated from ${JSON.stringify(user)} to ${JSON.stringify(
                updatedUser
              )}`
            );
          }
        }}
      />
    </ApolloProvider>
  );
};
