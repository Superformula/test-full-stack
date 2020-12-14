import { UserListAction, UserListState } from './types';

const initialState: UserListState = {
  users: [],
};

export default function userListReducer(state = initialState, action: UserListAction): UserListState {
  switch (action.type) {
    case 'ADD_USER':
    case 'DELETE_USER':
    case 'UPDATE_USER':
    case 'UPDATE_LIST':
    default:
      return state;
  }
}
