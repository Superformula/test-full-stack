import React from 'react';
import { UserCard } from 'components/user-card';
import { render } from '@testing-library/react';
import { fireEvent } from '@testing-library/dom';

import users from 'test/User.json';

const user = users[0];

describe('UserCard', () => {
  it('should render successfully', () => {
    const onClickHandler = jest.fn();
    const { baseElement, findByText, getByTestId } = render(
      <UserCard user={user} imageUrl="" onEdit={onClickHandler} />
    );
    expect(baseElement).toBeTruthy();
    const name = findByText(user.name);
    expect(name).toBeTruthy();

    const description = findByText(user.description);
    expect(description).toBeTruthy();

    const button = getByTestId('EditIcon');
    fireEvent.click(button, {
      button: 1,
    });
    expect(onClickHandler).toHaveBeenCalled();
  });
});
