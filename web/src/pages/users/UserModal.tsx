import React, { ReactElement, ReactNode, useCallback, useContext, useState } from 'react'
import { Form } from 'react-final-form'
import { FormattedMessage, useIntl } from 'react-intl'
import { ReactComponent as AddIcon } from '../../assets/icon-add.svg'
import { Button } from '../../components/button/Button'
import { FormItem } from '../../components/formItem/FormItem'
import { Icon } from '../../components/icon/Icon'
import { Input } from '../../components/input/Input'
import { Map } from '../../components/map/Map'
import { Modal, ModalContext } from '../../components/modal/Modal'
import { AddressAutocomplete } from './AddressAutocomplete'
import { UserDeleteButton } from './DeleteUserButton'
import { LatLng } from './hooks/useGetCoordinates'
import { CompleteUser, useGetUser } from './hooks/useGetUser'
import { useSaveUser } from './hooks/useSaveUser'

import style from './UserModal.module.scss'
import { UserNotFound } from './UserNotFound'
import { UserFormLoader } from './UsersLoader'

interface UserFormProps {
  user?: CompleteUser
}

export const required = (value: any): string | undefined => (value ? undefined : 'This field is required')

export const UserFormHeader = ({ user }: UserFormProps): ReactElement => {
  const { close } = useContext(ModalContext)
  return (
    <div className={style.formTitle}>
      <h1>{user?.id ? <FormattedMessage id="users.edit" /> : <FormattedMessage id="users.create" />}</h1>
      {user?.id && (
        <div className={style.removeButton}>
          <UserDeleteButton userId={user.id} onDeleteSuccess={close} />
        </div>
      )}
    </div>
  )
}

export const UserForm = ({ user }: UserFormProps): ReactElement => {
  const { close } = useContext(ModalContext)
  const { save } = useSaveUser()
  const [coordinates, setCoordinates] = useState<LatLng | null>(
    user ? { latitude: user.latitude, longitude: user.longitude } : null,
  )
  const intl = useIntl()
  const onSubmit = useCallback((values) => save(values).then(close), [save, close])

  return (
    <>
      <UserFormHeader user={user} />
      <Form
        initialValues={user}
        subscription={{ submitting: true, pristine: true }}
        onSubmit={onSubmit}
        render={({ handleSubmit }) => (
          <form onSubmit={handleSubmit}>
            <div className={style.userFormContent}>
              <Map latitude={coordinates?.latitude} longitude={coordinates?.longitude} />
              <div className={style.userFormFields}>
                <FormItem name="name" validate={required}>
                  <Input type="text" placeholder={intl.formatMessage({ id: 'users.field.name' })} />
                </FormItem>
                <FormItem name="address" validate={required}>
                  <AddressAutocomplete onCoordinateFound={setCoordinates} />
                </FormItem>
                <FormItem name="description" validate={required}>
                  <Input type="text" placeholder={intl.formatMessage({ id: 'users.field.description' })} />
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

export const UserModal = ({ children }: { children: ReactNode }): ReactElement => (
  <Modal trigger={children} width={1000} height={450}>
    <UserForm />
  </Modal>
)

export const CreateUserModal = (): ReactElement => (
  <UserModal>
    <button aria-roledescription="Create User">
      <Icon Component={AddIcon} size={46} />
    </button>
  </UserModal>
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
  return (
    <Modal trigger={children} width={1000} height={400}>
      <UserEditForm userId={userId} />
    </Modal>
  )
}
