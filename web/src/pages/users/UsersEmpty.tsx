import React, { ReactElement } from 'react'
import { FormattedMessage } from 'react-intl'
import { Button } from '../../components/button/Button'
import { UserModal } from './UserModal'

import style from './UsersEmpty.module.scss'

interface UsersEmptyProps {
  search: string | null | undefined
}

export const UsersEmpty = ({ search }: UsersEmptyProps): ReactElement => (
  <div className={style.usersEmpty}>
    <div className={style.message}>
      {search ? <FormattedMessage id="users.searchEmpty.message" /> : <FormattedMessage id="users.empty.message" />}
    </div>
    {!search && (
      <UserModal>
        <Button>
          <FormattedMessage id="users.empty.createFirstUser" />
        </Button>
      </UserModal>
    )}
  </div>
)
