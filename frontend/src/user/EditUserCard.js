import React, { useState } from 'react'
import { Input } from '../common/Input';
import './EditUserCard.css'
import { Button } from '../common/Button';

const EDIT_USER_TITLE = 'Edit';

export const EditUserCard = ({ user, onSaveClick, onCancelClick }) => {
  const [{ name, description, address }, setUserState] = useState({name: user.name, description: user.description, address: user.address})
  const modifyUserProperty = prop => value => {
    setUserState(prevState => ({ ...prevState, [prop]: value }))
  }

  const handleSaveClick = () => {
    onSaveClick({ name, description, address })
  }

  const handleCancelClick = () => {
    // Reset card state
    setUserState({ name: user.name, address: user.address, description: user.description })
    onCancelClick()
  }

  return (
    <div>
      <h2>{EDIT_USER_TITLE}</h2>
      <div className={'edit-user-content'}>
        <div className={'edit-user-map-container'}>
          MAP
        </div>
        <div className={'edit-user-properties-container'}>
          <Input value={name} label={'Name'} onChange={modifyUserProperty('name')}/>
          <Input value={address} label={'Address'} onChange={modifyUserProperty('address')}/>
          <Input value={description} label={'Description'} onChange={modifyUserProperty('description')}/>
        </div>
      </div>
      <div className={'edit-user-footer'}>
        <div/>
        <div className={'edit-user-button-container'}>
          <Button label={'Save'} onClick={handleSaveClick} />
          <Button label={'Cancel'} onClick={handleCancelClick} />
        </div>
      </div>
    </div>
  )
}
