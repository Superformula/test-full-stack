import React, { ReactElement } from 'react'
import { FormattedMessage } from 'react-intl'

export const UserNotFound = (): ReactElement => {
  return (
    <div>
      <FormattedMessage id="users.notFound" />
    </div>
  )
}
