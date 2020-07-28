import React, { ReactElement } from 'react'
import { FormattedMessage } from 'react-intl'
import { Button } from '../../components/button/Button'
import { UserModal } from './UserModal'

import style from './UsersEmpty.module.scss'

export const UsersEmpty = (): ReactElement => (
  <div className={style.usersEmpty}>
    <div className={style.message}>
      <FormattedMessage id="users.empty.message" />
    </div>
    <UserModal>
      <Button>
        <FormattedMessage id="users.empty.createFirstUser" />
      </Button>
    </UserModal>
  </div>
)
