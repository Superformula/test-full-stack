import { Dispatch, ReactElement } from 'react'

import UserForm from './UserForm'

import User from '../models/user'
import { ActionType } from '../interfaces'

interface Props {
  data: User
  dispatch: Dispatch<ActionType>
}

export default function UserCard({ data, dispatch }: Props): ReactElement {
  return <UserForm user={data} dispatch={dispatch} action="update" />
}
