import React from 'react';
import { render } from '@testing-library/react';
import App from '../App';

test('renders search input placeholder', () => {
  const { getByPlaceholderText } = render(<App />);
  const inputElement = getByPlaceholderText("Search...");
  expect(inputElement).toBeInTheDocument();
});
