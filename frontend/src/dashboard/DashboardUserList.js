import React, { useState, useEffect } from 'react'
import './Dashboard.css'
import { Loading } from "../common/Loading";
import UserCardContainer from "../user/UserCardContainer";

const AMOUNT_PER_ROW = 3

const DashboardRow = ({ users, onUserUpdate }) => {
  return (
    <div className={'dashboard-user-list'}>
      {users.map((user) => <UserCardContainer onUserUpdate={onUserUpdate} key={user.id} user={user}/>)}
    </div>
  )
}

export const DashboardUserList = ({ currentSearch, users, loading }) => {
  const [searchValue, setSearchValue] = useState(currentSearch)
  const [storedUsers, setStoredUsers] = useState(users)

  useEffect(() => {
    if (users.length) {
      setStoredUsers(prevValue => [...prevValue, ...users])
    }
    if (currentSearch !== searchValue) {
      setStoredUsers(users)
      setSearchValue(currentSearch)
    }
  }, [users, currentSearch])

  const onUserUpdate = (newUser) => {
    setStoredUsers(prevState => [...prevState.map(i => {
      if (i.id === newUser.id) {
        return { ...i, ...newUser }
      }
      return i
    })])
    console.log(newUser)
  }

  return loading ? <Loading /> : storedUsers.map((i, index) => {
    if (index % AMOUNT_PER_ROW === 0) {
      const nextIndex = index + AMOUNT_PER_ROW
      return <DashboardRow onUserUpdate={onUserUpdate} key={`${index}`} users={storedUsers.slice(index, nextIndex)}/>
    }
    return null
  })
}
