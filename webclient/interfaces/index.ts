import { Dispatch } from 'react'

import {
  HYDRATE_USERS,
  CREATE_USER,
  UPDATE_USER,
  DELETE_USER
} from '../constants/ActionTypes'
import User, { State } from '../models/user'

export type ActionType =
  | { type: typeof HYDRATE_USERS, payload: User[] }
  | { type: typeof CREATE_USER, payload: User }
  | { type: typeof UPDATE_USER, payload: User }
  | { type: typeof DELETE_USER, payload: string }

export interface AppContext {
  state: State;
  dispatch: Dispatch<ActionType>;
}
