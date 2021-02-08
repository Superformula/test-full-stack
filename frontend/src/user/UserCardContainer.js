import React, { useState } from 'react'
import { Modal } from '../common/Modal';
import { EditUserCard } from './EditUserCard';
import { UserCard } from './UserCard';
import { UPDATE_USER } from './queries/users';
import { withApollo } from "@apollo/client/react/hoc";

const UserCardContainer = ({ user, client, onUserUpdate }) => {
  const [isModalOpen, setIsOpen] = useState(false)
  const toggleOpen = () => {
    setIsOpen(prevState => !prevState)
  }

  const onSaveClick = ({ name, address, description }) => {
    const newUser = { id: user.id, name, address, description }
    client.mutate({
      mutation: UPDATE_USER,
      variables: newUser
    })
    toggleOpen()
    onUserUpdate(newUser)
  }

  return (
    <div>
      <Modal handleClose={toggleOpen} open={isModalOpen}><EditUserCard onSaveClick={onSaveClick} onCancelClick={toggleOpen} user={user}/></Modal>
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

export default withApollo(UserCardContainer)
