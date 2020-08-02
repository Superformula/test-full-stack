import React from 'react';
import { render } from '@testing-library/react';
import App from '../App';

test.skip('renders card', () => {
  const { getByText } = render(<App />);
  const loadMoreButton = getByText("Load More...");
  expect(loadMoreButton).toBeInTheDocument();
});
