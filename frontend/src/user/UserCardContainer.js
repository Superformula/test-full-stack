import React, { useState } from 'react'
import { Modal } from '../common/Modal';
import { EditUserCard } from './EditUserCard';
import { UserCard } from './UserCard';

export const UserCardContainer = ({ user} ) => {
  const [isModalOpen, setIsOpen] = useState(false)
  const toggleOpen = () => {
    setIsOpen(prevState => !prevState)
  }

  return (
    <div>
      <Modal handleClose={toggleOpen} open={isModalOpen}><EditUserCard onCancelClick={toggleOpen} user={user}/></Modal>
      <UserCard
        key={user.id}
        name={user.name}
        description={user.description}
        createdAt={user.dob}
        onEditClick={toggleOpen}
      />
    </div>
  )
}
