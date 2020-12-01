import React from 'react';
import { render, screen } from '@testing-library/react';
import App from './App';
import { act } from 'react-dom/test-utils';

test('All required elements are found.', () => {
  act(() => {
    render(<App />);
  })

  const searchBar = screen.getByTestId('searchBar');
  const cardsGrid = screen.getByTestId('cardsGrid');
  const loadMoreBtn = screen.getByText('Load More');

  expect(searchBar).toBeInTheDocument();
  expect(cardsGrid).toBeInTheDocument();
  expect(loadMoreBtn).toBeInTheDocument();
});
