import React, { ReactElement, ReactNode, useCallback, useContext } from 'react'
import { FormattedMessage } from 'react-intl'
import { ReactComponent as AddIcon } from '../../assets/icon-add.svg'
import { Button } from '../../components/button/Button'
import { FormItem } from '../../components/formItem/FormItem'
import { Icon } from '../../components/icon/Icon'
import { Input } from '../../components/input/Input'
import { Form } from 'react-final-form'
import { Map } from '../../components/map/Map'
import { Modal, ModalContext } from '../../components/modal/Modal'
import { useGetPersonQuery } from '../../generated/graphql'
import { CompleteUser, useGetUser } from './hooks/useGetUser'
import { useSaveUser } from './hooks/useSaveUser'

import style from './UserModal.module.scss'
import { UserNotFound } from './UserNotFound'
import { UserFormLoader } from './UsersLoader'

interface UserFormProps {
  user: CompleteUser
}

export const UserForm = ({ user }: UserFormProps): ReactElement => {
  const { close } = useContext(ModalContext)
  const { save } = useSaveUser()

  const onSubmit = useCallback((values) => {
    save(values).then(close)
  }, [])

  return (
    <>
      <h1>{user.id ? <FormattedMessage id="users.edit" /> : <FormattedMessage id="users.create" />}</h1>

      <Form
        initialValues={user}
        subscription={{ submitting: true, pristine: true }}
        onSubmit={onSubmit}
        render={({ handleSubmit }) => (
          <form onSubmit={handleSubmit}>
            <div className={style.userFormContent}>
              <Map />
              <div className={style.userFormFields}>
                <FormItem name="name">
                  <Input type="text" placeholder="Name" />
                </FormItem>
                <FormItem name="address">
                  <Input type="text" placeholder="Address" />
                </FormItem>
                <FormItem name="description">
                  <Input type="text" placeholder="Description" />
                </FormItem>
                <div className={style.userFormButtons}>
                  <Button type="primary" htmlType="submit">
                    <FormattedMessage id="save" />
                  </Button>
                  <Button onClick={close} htmlType="button">
                    <FormattedMessage id="close" />
                  </Button>
                </div>
              </div>
            </div>
          </form>
        )}
      />
    </>
  )
}

export const CreateUserModal = (): ReactElement => (
  <Modal trigger={<Icon Component={AddIcon} size={46} />} width={1000} height={400}>
    <UserForm user={{}} />
  </Modal>
)

interface EditUserModalProps {
  userId: string
  children: ReactNode
}

export const UserEditForm = ({ userId }: { userId: string }): ReactElement => {
  const { user, loading } = useGetUser(userId)

  if (loading) return <UserFormLoader />
  if (!user) return <UserNotFound />

  return <UserForm user={user} />
}

export const EditUserModal = ({ userId, children }: EditUserModalProps): ReactElement => {
  useGetPersonQuery()
  return (
    <Modal trigger={children} width={1000} height={400}>
      <UserEditForm userId={userId} />
    </Modal>
  )
}
