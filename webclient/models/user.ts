import { Reducer, Dispatch, BaseSyntheticEvent } from 'react'
import { Immutable, produce } from 'immer'

import callGraphQL from '../models/graphql-api'
import {
  HYDRATE_USERS,
  CREATE_USER,
  UPDATE_USER,
  DELETE_USER,
  SEARCH_USERS,
  LOAD_MORE_USERS
} from '../config/ActionTypes'
import { listUsers } from './../graphql/queries'
import { createUser, updateUser, deleteUser } from '../graphql/mutations'
import { DEFAULT_PAGE_SIZE } from '../config/constants'

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
  event: BaseSyntheticEvent,
  page?: number
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

    const payload = {
      user: data.createUser,
      page
    }
    dispatch({ type: CREATE_USER, payload })
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

async function handleLoadMoreUsers(
  dispatch: Dispatch<ActionType>,
  nextToken?: string
): Promise<void> {
  try {
    const { data } = await callGraphQL<ListUsersQuery>(listUsers, {
      limit: DEFAULT_PAGE_SIZE,
      nextToken
    } as ListUsersQueryVariables)

    const users = data.listUsers.items
    const hasReachedEndOfList = users.length === 0 && !data.listUsers.nextToken

    // Bail out on running out of items to load
    if (hasReachedEndOfList) {
      return
    }

    dispatch({ type: LOAD_MORE_USERS, payload: users })
  } catch ({ errors }) {
    console.error('Loading more users has failed', ...errors)
  }
}

async function handleSearchUsers(
  dispatch: Dispatch<ActionType>,
  searchTerm: string,
  isPristine: boolean
): Promise<void> {
  const searchFilter: ModelUserFilterInput = {
    name: {
      contains: searchTerm
    }
  }

  // Prevent network calls unless the search was initiated
  if (isPristine) {
    return
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
  nextToken?: string;
}

function isEligibleToShowMoreUsers(state: State, page = 1): boolean {
  const expectedNumberOfVisibleUsers = page * DEFAULT_PAGE_SIZE
  return state.users.length < expectedNumberOfVisibleUsers
}

const reducer: Reducer<State, ActionType> = (state, action) =>
  produce(state, draftState => {
    switch (action.type) {
      case HYDRATE_USERS:
      case SEARCH_USERS:
        draftState.users = action.payload || []
        break

      case CREATE_USER:
        if (isEligibleToShowMoreUsers(state, action.payload.page)) {
          draftState.users.push(action.payload.user)
        }
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

      case LOAD_MORE_USERS:
        draftState.users.push(...action.payload)
        break

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
  handleLoadMoreUsers,
  reducer as userReducer
}
