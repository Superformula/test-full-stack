import { UsersActions } from "./UsersActions.js";

const initialState = {
  users: [],
  currentEditUser: null,
};

const UsersReducer = (state = initialState, action) => {
  switch (action.type) {
    case UsersActions.SET_USERS:
      let users = mergeUsers(state.users, action.users);
      return {
        ...state,
        users: users,
      };
    case UsersActions.SET_CURRENT_EDIT_USER:
      return {
        ...state,
        currentEditUser: action.user,
      };
  }

  return initialState;
};

function mergeUsers(currentUsers, users) {
  if (currentUsers.length === 0) {
    return users;
  }
  let newUsers = [];
  for (let i = 0; i < users.length; i++) {
    let donHaveUser = true;
    for (let j = 0; j < currentUsers.length; j++) {
      if (users[i].id === currentUsers[j].id) {
        donHaveUser = false;
        currentUsers[j] = users[i];
        break;
      }
      if (donHaveUser) {
        newUsers.push(users[i]);
      }
    }
  }

  return [...currentUsers, ...newUsers].sort((a, b) => {
    return b.id.localeCompare(a.id);
  });
}

export default UsersReducer;
