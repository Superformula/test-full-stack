import React from 'react';
import { render } from '@testing-library/react';
import UserCard from './UserCard';

test('renders avatar and matches snapshot', () => {
  const { container } = render(<UserCard imageSrc="http://photo.com/photo" name="Pedro Yan" description="All good" />);
  expect(container).toMatchSnapshot();
});
