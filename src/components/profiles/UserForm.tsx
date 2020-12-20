import * as React from 'react'
import { useMutation } from '@apollo/react-hooks'
import CREATE_USER_MUTATION from './CreateUser.graphql'
import LIST_USER_QUERY from './ListUsers.graphql'
import { ListUsers } from './__generated__/ListUsers'
import { createUser } from './__generated__/createUser'

interface FormData {
  name: string
  address: string
  dateOfBirth: string
}

interface UserFormProps {
  onSubmitForm: (FormData) => void
}

const UserFormInput: React.FunctionComponent<UserFormProps> = ({ onSubmitForm }) => {
  const [name, setName] = React.useState<string>('')
  const [address, setAddress] = React.useState<string>('')
  const [dateOfBirth, setDateOfBirht] = React.useState<string>('')

  const onChangeName = (e) => setName(e.target.value)
  const onChangeAddress = (e) => setAddress(e.target.value)
  const onChangeDateOfBirth = (e) => setDateOfBirht(e.target.value)

  const onClickButton = () => {
    onSubmitForm({ name, address, dateOfBirth })
  }

  return (
    <div>
      <br />
      <label>Name:</label>
      <input type="text" name="name" value={name} onChange={onChangeName} />
      <br />
      <label>Date of Birth:</label>
      <input type="date" name="dateOfBirth" value={dateOfBirth} onChange={onChangeDateOfBirth} />
      <br />
      <label>Address:</label>
      <input type="text" name="address" value={address} onChange={onChangeAddress} />
      <br />
      <button onClick={onClickButton}>Create User</button>
    </div>
  )
}

export const UserForm = () => {
  const [createUser, { loading, error }] = useMutation<createUser>(CREATE_USER_MUTATION, {
    update(cache, { data }) {
      if (data?.createUser?.ok) {
        const cached = cache.readQuery<ListUsers>({
          query: LIST_USER_QUERY,
        })
        console.log(cached)
        cache.writeQuery({
          query: LIST_USER_QUERY,
          data: Object.assign({}, cached, {
            users: Object.assign({}, cached!.users, {
              edges: [{ node: data.createUser.user }, ...(cached?.users?.edges || [])],
            }),
          }),
        })
      }
    },
  })

  if (loading) <div>loading ...</div>
  if (error) <div>{error.message}</div>
  return <UserFormInput onSubmitForm={(formData) => createUser({ variables: { ...formData } })} />
}
