import { UserListAction, UserListState } from './types';

const initialState: UserListState = {
  users: [],
};

export default function userListReducer(state = initialState, action: UserListAction): UserListState {
  switch (action.type) {
    case 'ADD_USER':
      return { ...state, users: [...state.users, action.payload] };
    case 'DELETE_USER':
      return { ...state, users: state.users.filter((u) => u.id !== action.payload.userId) };
    case 'UPDATE_USER':
      return {
        ...state,
        users: state.users.map((u) => {
          if (u.id !== action.payload.id) return u;

          return { ...u, ...action.payload };
        }),
      };
    case 'UPDATE_LIST':
      return { ...state, users: action.payload };
    default:
      return state;
  }
}
