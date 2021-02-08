import React, { useState, useEffect } from 'react'
import { UserCard } from '../user/UserCard';
import './Dashboard.css'

const AMOUNT_PER_ROW = 3

const DashboardRow = ({ users }) => {
  return (
    <div className={'dashboard-user-list'}>
      {users.map(({ id, name, description, dob }) => (<UserCard
        key={id}
        name={name}
        description={description}
        createdAt={dob}
      />))}
    </div>
  )
}

export const DashboardUserList = ({ users, loading }) => {
  const [storedUsers, setStoredUsers] = useState([])

  useEffect(() => {
    if (users.length) {
      setStoredUsers(prevValue => [...prevValue, ...users])
    }
  }, [users])

  return storedUsers.map((i, index) => {
    if (index % AMOUNT_PER_ROW === 0) {
      const nextIndex = index + AMOUNT_PER_ROW
      return <DashboardRow key={`${index}`} users={storedUsers.slice(index, nextIndex)}/>
    }
    return null
  })
}
