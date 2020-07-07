import { UsersActions } from "./UsersActions.js";

const initialState = {
  users: [],
  currentEditUser: null,
  currentSearchTerm: null,
};

const UsersReducer = (state = initialState, action) => {
  switch (action.type) {
    case UsersActions.SET_USERS:
      let users = mergeUsers(
        state.users,
        action.users,
        state.currentSearchTerm
      );
      return {
        ...state,
        users: users,
      };
    case UsersActions.CLEAR_ALL_USERS:
      return { ...state, users: [] };
    case UsersActions.REMOVE_USER:
      let index = state.users.findIndex((item) => {
        return item.id === action.user.id;
      });
      if (index > -1) {
        state.users.splice(index, 1);
        let userArray = state.users;
        return { ...state, users: [...userArray] };
      }
      return state;
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
    default:
  }

  return initialState;
};

const mergeUsers = (currentUsers, users, currentSearchText) => {
  if (currentUsers.length === 0) {
    users.forEach((item) => (item.image = randomImage()));
    return users;
  }
  let newUsers = [];
  for (let i = 0; i < users.length; i++) {
    let donHaveUser = true;
    for (let j = 0; j < currentUsers.length; j++) {
      if (users[i].id === currentUsers[j].id) {
        donHaveUser = false;
        users[i].image = currentUsers[j].image;
        currentUsers[j] = users[i];
        break;
      }
    }
    if (donHaveUser) {
      users[i].image = randomImage();

      if (
        !currentSearchText ||
        currentSearchText.trim() === "" ||
        users[i].name
          .toLowerCase()
          .includes(currentSearchText.toLowerCase().trim())
      ) {
        newUsers.push(users[i]);
      }
    }
  }

  return [...currentUsers, ...newUsers].sort((a, b) => {
    return b.createdAt - a.createdAt;
  });
};

const randomImage = () => {
  let number = Math.floor(Math.random() * 1000);
  let result = number % 2;
  let type = "women";
  if (result === 1) {
    type = "men";
  }
  let imgNum = number % 26;
  return `https://randomuser.me/api/portraits/${type}/${imgNum}.jpg`;
};

export default UsersReducer;
