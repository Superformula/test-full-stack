import React from 'react'

import './UserCard.css'
import PencilIcon from '../common/img/edit-icon.png'

export const UserCard = ({ name, description, createdAt, onEditClick }) => {
  return (
    <div className={'user-card-container'}>
      <div className={'user-card-pencil-icon-container'} onClick={onEditClick}>
        <img className={'user-card-pencil-icon'} src={PencilIcon} alt={`icon-${name}`}/>
      </div>
      <img className={'user-card-image'} src={'https://source.unsplash.com/user/erondu/180x180'}  alt={`user-${name}`}/>
      <div className={'user-card-header-container'}>
        <div className={'user-card-header'}>
          <h2>{name}</h2>
          {createdAt && (
            <p className={'user-card-created-date'}>{`${createdAt}`}</p>
          )}
        </div>
        <p className={'user-card-description'}>{description}</p>
      </div>
    </div>
  )
};
