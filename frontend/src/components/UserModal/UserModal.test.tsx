import React from 'react';
import { render, fireEvent, screen } from '@testing-library/react';
import UserModal from './UserModal';
import styles from './UserModal.module.scss';

jest.mock('mapbox-gl/dist/mapbox-gl', () => ({
  Map: () => ({}),
}));

const user = {
  id: '1',
  name: 'Test',
};

test('should render the UserModal', () => {
  const { container } = render(
    <UserModal user={user} onClose={jest.fn()} onSave={jest.fn()} />,
  );
  const modalElement = container.querySelector(`.${styles.modal}`);
  expect(modalElement).toBeInTheDocument();
  const noLocationElement = screen.getByText(/No Location Entered/i);
  expect(noLocationElement).toBeInTheDocument();
});

test('should update the user and return it on save', () => {
  const onSaveMock = jest.fn();
  const { container } = render(
    <UserModal user={user} onClose={jest.fn()} onSave={onSaveMock} />,
  );

  // Update the user
  const updatedUser = {
    ...user,
    name: 'name',
    address: 'address',
    description: 'description',
  };
  const nameInput = container.querySelector('#name') as HTMLInputElement;
  fireEvent.change(nameInput, { target: { value: updatedUser.name } });
  const addressInput = container.querySelector('#address') as HTMLInputElement;
  fireEvent.change(addressInput, { target: { value: updatedUser.address } });
  const descriptionInput = container.querySelector(
    '#description',
  ) as HTMLInputElement;
  fireEvent.change(descriptionInput, {
    target: { value: updatedUser.description },
  });

  // Save the User
  const saveButton = screen.getByText(/Save/i);
  expect(saveButton).toBeInTheDocument();
  fireEvent.click(saveButton);
  expect(onSaveMock).toHaveBeenCalledTimes(1);
  expect(onSaveMock).toHaveBeenCalledWith(updatedUser);
});

test('should close when only clicking in the backdrop', () => {
  const onCloseMock = jest.fn();
  const { container } = render(
    <UserModal user={user} onClose={onCloseMock} onSave={jest.fn()} />,
  );

  const backdropElement = container.querySelector(
    `.${styles.backdrop}`,
  ) as Element;
  fireEvent.click(backdropElement);
  const contentElement = container.querySelector(
    `.${styles.content}`,
  ) as Element;
  fireEvent.click(contentElement);
  const headerElement = container.querySelector(`.${styles.header}`) as Element;
  fireEvent.click(headerElement);

  expect(onCloseMock).toHaveBeenCalledTimes(1);
});

test('should update the inner user', () => {
  const { container, rerender } = render(
    <UserModal user={user} onClose={jest.fn()} onSave={jest.fn()} />,
  );
  const nameInput = container.querySelector('#name') as HTMLInputElement;
  expect(nameInput.value).toBe(user.name);

  const newUser = {
    id: '2',
    name: 'Changed',
  };
  rerender(<UserModal user={newUser} onClose={jest.fn()} onSave={jest.fn()} />);
  const newNameInput = container.querySelector('#name') as HTMLInputElement;
  expect(newNameInput.value).toBe(newUser.name);

  rerender(
    <UserModal user={undefined} onClose={jest.fn()} onSave={jest.fn()} />,
  );
  const noNameInput = container.querySelector('#name') as HTMLInputElement;
  expect(noNameInput.value).toBe(newUser.name);
});
