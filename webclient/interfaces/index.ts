import { Dispatch } from 'react'

import {
  HYDRATE_USERS,
  CREATE_USER,
  UPDATE_USER,
  DELETE_USER,
  SEARCH_USERS
} from '../config/ActionTypes'
import User, { State } from '../models/user'

export type ActionType =
  | { type: typeof HYDRATE_USERS, payload: User[] }
  | { type: typeof CREATE_USER, payload: User }
  | { type: typeof UPDATE_USER, payload: User }
  | { type: typeof DELETE_USER, payload: string }
  | { type: typeof SEARCH_USERS, payload: User[] }

export interface AppContext {
  state: State;
  dispatch: Dispatch<ActionType>;
}

export type HTMLElementType = 'input' | 'textarea'
