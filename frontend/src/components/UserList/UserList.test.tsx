import React from 'react';
import { useSelector } from 'react-redux';
import { render } from '@testing-library/react';
import UserList from './UserList';
import { UserListState } from '../../store/userList/types';
import { UserListItem } from '../../api/queries';

jest.mock('react-redux');

const mockedSelector = useSelector as jest.Mock<typeof useSelector>;

describe('User list test', () => {
  it('should show loading', () => {
    const result = render(<UserList isLoading />);

    const loadingElement = result.getByText(/Loading/i);
    expect(loadingElement).toBeInTheDocument();
  });

  it('should show no users', () => {
    // https://jestjs.io/docs/en/mock-functions
    mockedSelector.mockReturnValue({ users: [] } as any);

    const result = render(<UserList isLoading={false} />);

    const loadingElement = result.queryByText(/Loading.../i);
    expect(loadingElement).toBeFalsy();

    const noUsersElement = result.getByText(/No users/i);
    expect(noUsersElement).toBeInTheDocument();
  });

  it('should show users', () => {
    mockedSelector.mockReturnValue({
      users: [
        {
          id: 'abc',
          name: 'Pedro Yan',
          description: 'I love unit testing',
          avatar: 'http://photo.com',
          createdAt: 123123646355,
        },
      ],
    } as any);

    const result = render(<UserList isLoading={false} />);

    const loadingElement = result.queryByText(/Loading.../i);
    expect(loadingElement).toBeFalsy();

    const noUsersElement = result.queryByText(/No users/i);
    expect(noUsersElement).toBeFalsy();

    const element = result.getByText(/Pedro Yan/i);
    expect(element).toBeInTheDocument();
  });
});
