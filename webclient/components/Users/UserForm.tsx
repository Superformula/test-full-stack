import {
  useState,
  Dispatch,
  ReactElement,
  ChangeEvent,
  FormEvent,
  FormEventHandler,
  MouseEventHandler,
  ChangeEventHandler
} from 'react'

import Form from '../generic/Form'
import InputField from '../generic/InputField'
import Button from '../generic/Button'

import User, { handleCreateUser, handleUpdateUser } from '../../models/user'

import { ActionType } from '../../interfaces'

type UserEditableParams = 'id' | 'name' | 'address' | 'description'
type UserEdit = Pick<User, UserEditableParams>
type UserEditableFields = keyof Omit<UserEdit, 'id'>

interface Props {
  dispatch: Dispatch<ActionType>;
  user?: User;
}

export default function UserForm({
  dispatch,
  user
}: Props): ReactElement {
  const isUpdateMode = Boolean(user)
  const [userDetails, setUserDetails] = useState(user)
  const [isDirty, setIsDirty] = useState(false)

  const { name, address, description } = userDetails || {}

  const handleFieldEdit = (fieldName: UserEditableFields) => (
    event: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ): ChangeEventHandler => {
    setIsDirty(true)
    setUserDetails({ ...userDetails, [fieldName]: event.target.value })
    return
  }

  const handleUserSubmit: FormEventHandler = (
    event: FormEvent<HTMLFormElement>
  ) => handleCreateUser(dispatch, event)

  const handleUserUpdate: MouseEventHandler = () => {
    const data: UserEdit = {
      id: user.id,
      name,
      address,
      description
    }
    return handleUpdateUser(dispatch, data)
  }

  const ActionButton: ReactElement =
    isUpdateMode ? (
      <Button disabled={!isDirty} type="button" onClick={handleUserUpdate}>
        Save
      </Button>
    ) : (
      <Button>Create</Button>
    )

  return (
    <Form onSubmit={handleUserSubmit}>
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

      {ActionButton}
    </Form>
  )
}
