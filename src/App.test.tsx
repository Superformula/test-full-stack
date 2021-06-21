import React from 'react';
import { MockedProvider } from '@apollo/client/testing';
import { render, screen } from '@testing-library/react';
import App from './App';

test('renders learn react link', () => {
  render(
    <MockedProvider mocks={[]} addTypename={false}>
      <App />
    </MockedProvider>,
  );
  const linkElement = screen.getByText(/Users List/i);
  expect(linkElement).toBeInTheDocument();
});
