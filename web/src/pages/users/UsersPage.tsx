import React, { ReactElement } from 'react'
import { FormattedMessage } from 'react-intl'
import { Input } from '../../components/input/Input'
import { UserCard } from './UserCard'
import { User, useGetUsers } from './hooks/useGetUsers'

import style from './UsersPage.module.scss'

export const UsersPage = (): ReactElement => {
  const { users } = useGetUsers()
  return (
    <div>
      <div className={style.usersHeader}>
        <h1>
          <FormattedMessage id="users.title" />
        </h1>
        <Input type="text" placeholder={'Search...'} />
      </div>
      <div className={style.usersBody}>
        {users.map((user: User) => (
          <UserCard key={user.id} name={user.name} avatar={user.avatar} description={user.description} />
        ))}
      </div>
    </div>
  )
}
