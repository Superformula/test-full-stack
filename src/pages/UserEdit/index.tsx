import { memo } from 'react';
import { UserEditModal as Element } from './UserEditModal';
import { useUserEditModal } from './modal/ModalComponent';

function UserEditModalComponent() {
  const { closeDialog, user } = useUserEditModal();

  if (!user) {
    return null;
  }
  console.log('user -> ', user);
  return <Element onCancelCLick={closeDialog} user={user} />;
}

export const UserEditModal = memo(UserEditModalComponent);
