import React from 'react';
import { render } from '@testing-library/react';
import App from '../App';

test('renders load more button', () => {
  const { getByText } = render(<App />);
  const loadMoreButton = getByText("Load More...");
  expect(loadMoreButton).toBeInTheDocument();
});
