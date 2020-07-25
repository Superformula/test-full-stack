import React, { ReactElement } from 'react'
import { FormattedMessage } from 'react-intl'
import { ReactComponent as AddIcon } from '../../assets/icon-add.svg'
import { Icon } from '../../components/icon/Icon'
import { Modal } from '../../components/modal/Modal'

export const UserForm = (): ReactElement => (
  <div>
    <h1>
      <FormattedMessage id="users.edit" />
    </h1>
  </div>
)

export const CreateUserModal = (): ReactElement => (
  <Modal trigger={<Icon Component={AddIcon} size={46} />} width={800} height={400}>
    <UserForm />
  </Modal>
)
