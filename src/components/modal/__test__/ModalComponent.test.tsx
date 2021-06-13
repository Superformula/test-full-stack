import React, { useEffect } from 'react';
import { render, screen } from '@testing-library/react';
import { UserEditModalProvider, useUserEditModal } from '../ModalComponent';
import { User } from '../../../generated/graphql';

const user: User = {
  address: '79 bond street',
  createdAt: '2021-06-13T17:17:05.949Z',
  description: 'Test',
  dob: '2021-06-13T17:15:04.804Z',
  id: '57f0f71e-ac3c-4006-8918-e53504335e99',
  imageUrl: '',
  name: 'Anderson Leal',
  updatedAt: '2021-06-13T21:36:26.332Z',
};

const OpenComponent = () => {
  const { openDialog } = useUserEditModal();
  useEffect(() => {
    openDialog(user);
  }, [openDialog]);
  return null;
};

const ModalComponent = () => {
  return <div>test</div>;
};

test('Should open modal', () => {
  const { container } = render(
    <UserEditModalProvider modalComponent={<ModalComponent />}>
      <OpenComponent />
    </UserEditModalProvider>
  );

  const modalElement = screen.getByText(/test/i);

  expect(modalElement).toBeInTheDocument();
  expect(container).toBeInTheDocument();
});

test('Should not open modal', () => {
  const { container } = render(
    <UserEditModalProvider modalComponent={<ModalComponent />} />
  );
  expect(container).toBeEmptyDOMElement();
});
