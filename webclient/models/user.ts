import { Reducer, Dispatch, BaseSyntheticEvent } from 'react'
import { Immutable, produce } from 'immer'

import callGraphQL from '../models/graphql-api'
import {
  HYDRATE_USERS,
  CREATE_USER,
  UPDATE_USER,
  DELETE_USER,
  SEARCH_USERS
} from '../config/ActionTypes'
import { listUsers } from './../graphql/queries'
import { createUser, updateUser, deleteUser } from '../graphql/mutations'

import {
  ListUsersQuery,
  ListUsersQueryVariables,
  ModelUserFilterInput,
  GetUserQuery,
  CreateUserMutation,
  CreateUserMutationVariables,
  UpdateUserMutation,
  UpdateUserMutationVariables,
  DeleteUserMutation,
  DeleteUserMutationVariables
} from '../API'
import { ActionType } from '../interfaces'

// Model type
type User = Omit<GetUserQuery['getUser'], '__typename'>

async function handleCreateUser(
  dispatch: Dispatch<ActionType>,
  event: BaseSyntheticEvent
): Promise<void> {
  event.preventDefault()

  const form = new FormData(event.target)

  const userData = {
    name: form.get('name'),
    description: form.get('description'),
    address: form.get('address')
  }

  try {
    const { data } = await callGraphQL<CreateUserMutation>(createUser, {
      input: userData
    } as CreateUserMutationVariables)

    dispatch({ type: CREATE_USER, payload: data.createUser })
  } catch ({ errors }) {
    console.error('Creating a user failed', ...errors)
  }
}

async function handleUpdateUser(
  dispatch: Dispatch<ActionType>,
  user: Partial<User>
): Promise<void> {
  try {
    const { data } = await callGraphQL<UpdateUserMutation>(updateUser, {
      input: user
    } as UpdateUserMutationVariables)

    dispatch({ type: UPDATE_USER, payload: data.updateUser })
  } catch ({ errors }) {
    console.error('Updating a user failed', ...errors)
  }
}

async function handleDeleteUser(
  dispatch: Dispatch<ActionType>,
  id: string
): Promise<void> {
  try {
    await callGraphQL<DeleteUserMutation>(deleteUser, {
      input: { id }
    } as DeleteUserMutationVariables)

    dispatch({ type: DELETE_USER, payload: id })
  } catch ({ errors }) {
    console.error('Deleting a user failed', ...errors)
  }
}

async function handleSearchUsers(
  dispatch: Dispatch<ActionType>,
  searchTerm: string
): Promise<void> {
  const searchFilter: ModelUserFilterInput = {
    name: {
      contains: searchTerm
    }
  }

  try {
    const { data } = await callGraphQL<ListUsersQuery>(listUsers, {
      filter: searchFilter
    } as ListUsersQueryVariables)

    dispatch({ type: SEARCH_USERS, payload: data.listUsers.items })
  } catch ({ errors }) {
    console.error('Search operation failed', ...errors)
  }
}

export type StateUsers = Immutable<User[]>
export interface State {
  users: StateUsers;
}

const reducer: Reducer<State, ActionType> = (state, action) =>
  produce(state, draftState => {
    switch (action.type) {
      case HYDRATE_USERS:
      case SEARCH_USERS:
        draftState.users = action.payload
        break

      case CREATE_USER:
        draftState.users.push(action.payload)
        break

      case UPDATE_USER: {
        const index = state.users.findIndex(
          ({ id }) => action.payload.id === id
        )
        if (index === -1) {
          return state
        }
        draftState.users[index] = { ...action.payload }
        break
      }

      case DELETE_USER: {
        const index = state.users.findIndex(({ id }) => action.payload === id)
        if (index === -1) {
          return state
        }
        draftState.users.splice(index, 1)
        break
      }

      default:
        return state
    }
  })

export default User
export {
  handleCreateUser,
  handleUpdateUser,
  handleDeleteUser,
  handleSearchUsers,
  reducer as userReducer
}
