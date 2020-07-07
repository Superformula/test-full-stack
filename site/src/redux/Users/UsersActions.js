const UsersActions = {
  SET_USERS: "SET_USERS",
  CLEAR_ALL_USERS: "CLEAR_ALL_USERS",
  REMOVE_USER: "REMOVE_USER",
  SET_CURRENT_EDIT_USER: "SET_CURRENT_EDIT_USER",
  SET_CURRENT_SEARCH_TERM: "SET_CURRENT_SEARCH_TERM",

  setUsers(users) {
    return {
      type: this.SET_USERS,
      users: users,
    };
  },

  clearAllUsers() {
    return {
      type: this.CLEAR_ALL_USERS,
    };
  },

  removeUser(user) {
    return {
      type: this.REMOVE_USER,
      user: user,
    };
  },

  setCurrentUser(user) {
    return {
      type: this.SET_CURRENT_EDIT_USER,
      user: user,
    };
  },

  setCurrentSearchTerm(currentSearchTerm) {
    return {
      type: this.SET_CURRENT_SEARCH_TERM,
      currentSearchTerm: currentSearchTerm,
    };
  },
};

export { UsersActions };
