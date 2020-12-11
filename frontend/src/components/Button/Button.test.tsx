import React from 'react';
import { render } from '@testing-library/react';
import Button from './Button';

test('should render a button', () => {
  const { container } = render(<Button />);
  const buttonElement = container.querySelector('button');
  expect(buttonElement).toBeInTheDocument();
});
