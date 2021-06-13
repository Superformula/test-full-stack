import React from 'react';
import { render, screen } from '@testing-library/react';
import { UserCard } from '../';
import { User } from '../../../../generated/graphql';

const user: User = {
  address: '79 bond street',
  createdAt: '2021-06-13T17:17:05.949Z',
  description: 'Test',
  dob: '2021-06-13T17:15:04.804Z',
  id: '57f0f71e-ac3c-4006-8918-e53504335e99',
  imageUrl: '',
  name: 'Ivan Fannie',
  updatedAt: '2021-06-13T21:36:26.332Z',
};

test('Should render User Card', () => {
  render(<UserCard user={user} />);
  const nameElement = screen.getByText(user.name);
  const descriptionElement = screen.getByText(user.description);
  const createdAtElement = screen.getByText(/13 Jun 2021/i);

  expect(nameElement).toBeInTheDocument();
  expect(descriptionElement).toBeInTheDocument();
  expect(createdAtElement).toBeInTheDocument();
});
