import React from 'react';
import { Avatar } from 'components/avatar';
import { render } from '@testing-library/react';

describe('Avatar', () => {
  it('should render successfully', () => {
    const element = render(<Avatar imageUrl="abc123" className="" />);
    expect(element).toBeTruthy();
  });
});
