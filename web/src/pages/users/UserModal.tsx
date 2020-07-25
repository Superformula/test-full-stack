import React, { ReactElement, useContext } from 'react'
import { FormattedMessage } from 'react-intl'
import { ReactComponent as AddIcon } from '../../assets/icon-add.svg'
import { Button } from '../../components/button/Button'
import { Icon } from '../../components/icon/Icon'
import { Input } from '../../components/input/Input'
import { StaticMap } from '../../components/map/Map'
import { Modal, ModalContext } from '../../components/modal/Modal'

import style from './UserModal.module.scss'

export const UserForm = (): ReactElement => {
  const { close } = useContext(ModalContext)
  return (
    <>
      <h1>
        <FormattedMessage id="users.edit" />
      </h1>
      <div className={style.userFormContent}>
        <StaticMap />
        <div className={style.userFormFields}>
          <Input type="text" name="name" placeholder="Name" />
          <Input type="text" name="address" placeholder="Address" />
          <Input type="text" name="description" placeholder="Description" />
          <div className={style.userFormButtons}>
            <Button type="primary">
              <FormattedMessage id="save" />
            </Button>
            <Button onClick={close}>
              <FormattedMessage id="close" />
            </Button>
          </div>
        </div>
      </div>
    </>
  )
}

export const CreateUserModal = (): ReactElement => (
  <Modal trigger={<Icon Component={AddIcon} size={46} />} width={1000} height={400}>
    <UserForm />
  </Modal>
)
