import React from 'react'
import './UserCard.css'

export const UserCard = ({ name, description, createdAt }) => {
  return (
    <div className={'user-card-container'}>
      <img className={'user-card-image'} src={'https://source.unsplash.com/user/erondu/180x180'}  alt={`user-${name}`}/>
      <div className={'user-card-header'}>
        <h2>{name}</h2>
        {createdAt && (
          <p className={'user-card-created-date'}>{`${createdAt}`}</p>
        )}
      </div>
      <p className={'user-card-description'}>{description}</p>
    </div>
  )
};
