import { UserListItem } from '../../api/queries';
import { ADD_USER, DELETE_USER, UPDATE_LIST, UPDATE_USER, UserListAction } from './types';

export function updateList(newList: UserListItem[]): UserListAction {
  return {
    type: UPDATE_LIST,
    payload: newList,
  };
}

export function deleteUser(id: string): UserListAction {
  return {
    type: DELETE_USER,
    payload: { userId: id },
  };
}

export function addUser(newItem: UserListItem): UserListAction {
  return {
    type: ADD_USER,
    payload: newItem,
  };
}

export function updateUser(updatedItem: UserListItem): UserListAction {
  return {
    type: UPDATE_USER,
    payload: updatedItem,
  };
}
