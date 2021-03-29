import {
  useState,
  Dispatch,
  ReactElement,
  ChangeEvent,
  FormEvent,
  FormEventHandler,
  MouseEventHandler
} from 'react'

import User, { handleCreateUser, handleUpdateUser } from '../models/user'

import { ActionType } from '../interfaces'

type UserEditableParams = 'id' | 'name' | 'address' | 'description'

type UserEdit = Pick<User, UserEditableParams>

type UserEditableFields = keyof Omit<UserEdit, 'id'>

interface Props {
  dispatch: Dispatch<ActionType>
  user?: User
  action: 'create' | 'update'
}

export default function UserForm({
  dispatch,
  user,
  action
}: Props): ReactElement {
  const [userDetails, setUserDetails] = useState(user)
  const [isDirty, setIsDirty] = useState(false)

  const { name, address, description } = userDetails || {}

  const handleFieldEdit = (fieldName: UserEditableFields) => (
    event: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    setIsDirty(true)
    setUserDetails({ ...userDetails, [fieldName]: event.target.value })
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
    action === 'create' ? (
      <button>Create</button>
    ) : (
      <button disabled={!isDirty} type="button" onClick={handleUserUpdate}>
        Save
      </button>
    )

  return (
    <>
      <form onSubmit={handleUserSubmit}>
        <fieldset>
          <legend>Name</legend>
          <input
            value={name}
            onChange={handleFieldEdit('name')}
            placeholder="John Doe"
            required
            autoFocus
            name="name"
            tabIndex={0}
          />
        </fieldset>

        <fieldset>
          <legend>Location</legend>
          <input
            value={address}
            onChange={handleFieldEdit('address')}
            placeholder="Seattle WA 227"
            required
            name="address"
            tabIndex={1}
          />
        </fieldset>

        <fieldset>
          <legend>Description</legend>
          <textarea
            value={description}
            onChange={handleFieldEdit('description')}
            placeholder="Fun facts about yourself"
            name="description"
            tabIndex={2}
          />
        </fieldset>

        {ActionButton}
      </form>
    </>
  )
}
