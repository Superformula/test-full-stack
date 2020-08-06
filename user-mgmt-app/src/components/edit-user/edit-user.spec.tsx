import { fireEvent } from '@testing-library/dom';
import { render } from '@testing-library/react';
import { EditUser } from 'components/edit-user';
import { User } from 'graphql/user-api/@types';
import { GeocodeDocument } from 'graphql/user-api/queries/generated/userapi-queries';
import React from 'react';
import { MockedProvider } from '@apollo/client/testing';
import users from 'test/User.json';

const user = users[0];

const mocks = [
  {
    request: {
      query: GeocodeDocument,
      variables: {
        geocodeInput: { address: ' 96057 Boyer Harbor Suite 076' },
      },
    },
    result: {
      data: {
        geocode: {
          latitude: '32.9281328',
          longitude: '-80.001655',
          error: null,
        },
      },
    },
  },
];

describe('EditUser', () => {
  it('should render successfully and cancel', () => {
    let called = false;
    const onClickHandler = (_user?: User) => (called = true);
    const { baseElement, getByLabelText, getByText, getByTestId } = render(
      <MockedProvider mocks={mocks} addTypename={true}>
        <EditUser onClose={onClickHandler} visible={true} user={user} />
      </MockedProvider>
    );
    expect(baseElement).toBeTruthy();

    const cancelButton = getByText(/Cancel/i);
    fireEvent.click(cancelButton, {
      button: 1,
    });
    expect(called).toBeTruthy();

    const nameInput = getByLabelText('Name');
    expect(nameInput.value).toEqual(user.name);

    const addressInput = getByLabelText('Address');
    expect(addressInput.value).toEqual(user.address);

    const descriptionInput = getByLabelText('Description');
    expect(descriptionInput.value).toEqual(user.description);

    const div = getByTestId('Modal');
    expect(div).toBeVisible();
  });

  it('should not be visible', () => {
    const onClickHandler = (_user?: User) => {};
    const { getByTestId } = render(
      <MockedProvider mocks={mocks} addTypename={true}>
        <EditUser onClose={onClickHandler} visible={false} user={user} />
      </MockedProvider>
    );

    const div = getByTestId('Modal');
    expect(div).toBeTruthy();
    expect(div).not.toBeVisible();
  });
});
