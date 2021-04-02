import {
  useState,
  ReactElement,
  ChangeEvent,
  BaseSyntheticEvent,
  FormEventHandler,
  MouseEventHandler,
  ChangeEventHandler
} from 'react'

import Form from '../generic/Form'
import InputField from '../generic/InputField'
import Button from '../generic/Button'
import Mapbox from '../Mapbox'

import { useMapbox } from '../../hooks/useMapbox'
import User, {
  UserEdit,
  UserCreate,
  UserEditableFields
} from '../../models/user'

import styles from './UserForm.module.css'

interface Props {
  user?: User;
  action?: 'create' | 'update';
  onCancelUpdateUser?: () => void;
  onUpdateUser?: (data: UserEdit) => void;
  onCreateUser?: (data: UserCreate) => void;
}

export default function UserForm({
  user,
  action = 'create',
  onCancelUpdateUser,
  onUpdateUser,
  onCreateUser
}: Props): ReactElement {
  const isUpdateMode = action === 'update'

  const [userDetails, setUserDetails] = useState(user)
  const [isDirty, setIsDirty] = useState(false)

  const { name, address, description } = userDetails || {}

  const mapboxRef = useMapbox(address)

  const handleFieldEdit = (fieldName: UserEditableFields) => (
    event: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ): ChangeEventHandler => {
    setIsDirty(true)
    setUserDetails({ ...userDetails, [fieldName]: event.target.value })
    return
  }

  const handleUserSubmit: FormEventHandler = (event: BaseSyntheticEvent) => {
    event.preventDefault()

    const form = new FormData(event.target)
    const userData = {
      name: form.get('name'),
      description: form.get('description'),
      address: form.get('address')
    } as UserCreate

    return onCreateUser(userData)
  }

  const handleUserUpdate: MouseEventHandler = () => {
    const data: UserEdit = {
      id: user.id,
      name,
      address,
      description
    }
    return onUpdateUser(data)
  }

  const ActionButton: ReactElement = isUpdateMode ? (
    <Button disabled={!isDirty} type="button" onClick={handleUserUpdate}>
      Save
    </Button>
  ) : (
    <Button>Create</Button>
  )

  return (
    <>
      <Mapbox forwardRef={mapboxRef} />
      <Form onSubmit={handleUserSubmit} className={styles.form}>
        <InputField
          label="Name"
          value={name}
          onChange={handleFieldEdit('name')}
          placeholder="John Doe..."
          required
          autoFocus
          name="name"
          tabIndex={0}
        />

        <InputField
          label="Location"
          value={address}
          onChange={handleFieldEdit('address')}
          placeholder="Seattle WA 227..."
          required
          name="address"
          tabIndex={1}
        />

        <InputField
          label="Description"
          elementType="textarea"
          value={description}
          onChange={handleFieldEdit('description')}
          placeholder="Fun facts about yourself..."
          name="description"
          tabIndex={2}
          rows={3}
        />

        <div className={styles.actionButtons}>
          {ActionButton}
          {isUpdateMode && (
            <Button type="button" onClick={onCancelUpdateUser}>
              Cancel
            </Button>
          )}
        </div>
      </Form>
    </>
  )
}
