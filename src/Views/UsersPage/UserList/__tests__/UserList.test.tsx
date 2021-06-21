// eslint-disable-next-line import/no-extraneous-dependencies
import { render, screen } from '@testing-library/react';
import React from 'react';
import { MockedProvider } from '@apollo/client/testing';
import { User } from '../../../../types';
import UserList from '../UserList';

const users = [
  {
    address: 'Somewhere nice',
    createdAt: '2021-06-19T17:56:35+00:00',
    description: 'Lorem Ipsum',
    id: '5f3c1362-48d9-4ff3-be8b-6544eb29s8da',
    imageUrl: 'https://unsplash.com/photos/YWpWKO9PNns/download?force=true&w=640',
    name: 'Marcelo Aleixo',
    __typename: 'User',
  } as User,
  {
    address: 'Somewhere nice',
    createdAt: '2021-06-19T17:56:35+00:00',
    description: 'Dolor Amet',
    id: '5f3c1362-48d9-4ff3-be8b-6544eb26hg4a',
    imageUrl: 'https://unsplash.com/photos/YWpWKO9PNns/download?force=true&w=640',
    name: 'John Doe',
    __typename: 'User',
  } as User,
];

describe('<UserList />', () => {
  it('Should render correctly', () => {
    render(
      <MockedProvider mocks={[]} addTypename={false}>
        <UserList users={users} />
      </MockedProvider>,
    );

    expect(screen.getByText('Marcelo Aleixo')).toBeInTheDocument();
    expect(screen.getByText('John Doe')).toBeInTheDocument();
  });
});
