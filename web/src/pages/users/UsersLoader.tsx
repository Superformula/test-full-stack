import React, { ReactElement } from 'react'
import { FormattedMessage } from 'react-intl'

export const UsersLoader = (): ReactElement => {
  return (
    <div>
      <FormattedMessage id="loading" />
    </div>
  )
}

export const UserFormLoader = (): ReactElement => {
  return (
    <div>
      <FormattedMessage id="loading" />
    </div>
  )
}
