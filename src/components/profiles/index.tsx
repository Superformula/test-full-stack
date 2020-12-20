import * as React from 'react'
import { UserList } from './UserList'
import { UserForm } from './UserForm'

export const ProfilePage = () => {
  return (
    <div>
      <UserForm />
      <UserList />
    </div>
  )
}
