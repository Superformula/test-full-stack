import React from 'react';
import { UserList } from 'components/user-list';
import { render } from '@testing-library/react';
import { fireEvent } from '@testing-library/dom';

import users from 'test/User.json';

const testUsers = users.slice(0, 5);
const userNames = new Set(testUsers.map((user) => user.name));
const userDescriptions = new Set(testUsers.map((user) => user.description));

describe('UserCard', () => {
  it('should render successfully', () => {
    let calls = 0;
    const onClickHandler = () => (calls += 1);
    const { baseElement, container, getAllByTestId } = render(
      <UserList users={testUsers} onEdit={onClickHandler} />
    );
    expect(baseElement).toBeTruthy();

    const spans = container.querySelectorAll('span');

    let foundUsers = 0;
    let foundDesc = 0;
    spans.forEach((span: HTMLSpanElement) => {
      if (userNames.has(span.innerHTML)) {
        foundUsers += 1;
      }
      if (userDescriptions.has(span.innerHTML)) {
        foundDesc += 1;
      }
    });
    expect(foundUsers).toEqual(userNames.size);
    expect(foundDesc).toEqual(userDescriptions.size);

    const editIcons = getAllByTestId('EditIcon');
    editIcons.forEach((editIcon: HTMLDivElement) =>
      fireEvent.click(editIcon, {
        button: 1,
      })
    );
    expect(calls).toEqual(testUsers.length);
  });
});
