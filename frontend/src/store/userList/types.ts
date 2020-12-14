import { UserListItem } from '../../api/queries';

export interface UserListState {
  users: UserListItem[];
}

export const UPDATE_LIST = 'UPDATE_LIST';
export const DELETE_USER = 'DELETE_USER';
export const ADD_USER = 'ADD_USER';
export const UPDATE_USER = 'UPDATE_USER';

export interface UpdateListAction {
  type: typeof UPDATE_LIST;
  payload: UserListItem[];
}

export interface DeleteUserAction {
  type: typeof DELETE_USER;
  payload: { userId: string };
}

export interface AddUserAction {
  type: typeof ADD_USER;
  payload: UserListItem;
}

export interface UpdateUserAction {
  type: typeof UPDATE_USER;
  payload: UserListItem;
}

export type UserListAction = UpdateListAction | DeleteUserAction | AddUserAction | UpdateUserAction;
