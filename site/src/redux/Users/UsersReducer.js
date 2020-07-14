import { UsersActions } from "./UsersActions.js";

const initialState = {
  users: [],
  userNumberLimit: parseInt(process.env.REACT_APP_USERS_NUMBER_LIMIT),
  currentEditUser: null,
  currentSearchTerm: "",
};

const UsersReducer = (state = initialState, action) => {
  switch (action.type) {
    case UsersActions.SET_USERS:
      return {
        ...state,
        users: action.users,
      };
    case UsersActions.CLEAR_ALL_USERS:
      return { ...state, users: [] };
    case UsersActions.SET_CURRENT_EDIT_USER:
      return {
        ...state,
        currentEditUser: action.user,
      };
    case UsersActions.SET_CURRENT_SEARCH_TERM:
      return {
        ...state,
        currentSearchTerm: action.currentSearchTerm,
      };
    case UsersActions.SET_MAX_USER_LIMIT:
      return {
        ...state,
        userNumberLimit: action.userNumberLimit,
      };
    default:
  }

  return state;
};

export default UsersReducer;
