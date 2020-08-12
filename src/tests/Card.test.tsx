import React from 'react';
import { render } from '@testing-library/react';
import Card from '../components/Card';

const TestUser = {
  id: "test",
  name: "test user",
  avatar: "www.test.com",
  address: "test",
  description: "test test test",
  createdAt: "2020-08-04T02:02:57.436Z",
  version: 1,
}

describe('Card', () => {
  let wrapper: any;

  beforeAll(() => wrapper = render(<Card activeUser={TestUser} propagateUser={TestUser} />));

  test('renders cards', () => {
    const { getByText } = wrapper;
    const titleText = getByText("test user");
    expect(titleText).toBeInTheDocument();
  });
});
