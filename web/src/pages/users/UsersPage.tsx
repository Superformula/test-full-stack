import React, { ReactElement } from 'react'
import { FormattedMessage } from 'react-intl'
import { Button } from '../../components/button/Button'
import { Input } from '../../components/input/Input'
import { useGetUsers, User } from './hooks/useGetUsers'
import { UserCard } from './UserCard'
import { CreateUserModal, EditUserModal } from './UserModal'
import { UsersLoader } from './UsersLoader'

import style from './UsersPage.module.scss'

export const UsersPage = (): ReactElement => {
  const { users, hasMore, loadMore, loading } = useGetUsers()
  return (
    <div className={style.users}>
      <div className={style.usersHeader}>
        <h1>
          <FormattedMessage id="users.title" />
        </h1>
        <CreateUserModal />
        <Input type="text" placeholder={'Search...'} placeholderOnTop={false} />
      </div>
      <div className={style.usersBody}>
        {users.map((user: User) => (
          <EditUserModal key={user.id} userId={user.id}>
            <UserCard name={user.name} avatar={user.avatar} description={user.description} />
          </EditUserModal>
        ))}
        {loading ? <UsersLoader /> : null}
      </div>
      {hasMore ? (
        <div className={style.loadMore}>
          <Button onClick={loadMore}>
            <FormattedMessage id="users.loadMore" />
          </Button>
        </div>
      ) : null}
    </div>
  )
}
