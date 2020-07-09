const UsersActions = {
  SET_USERS: "SET_USERS",
  CLEAR_ALL_USERS: "CLEAR_ALL_USERS",
  SET_CURRENT_EDIT_USER: "SET_CURRENT_EDIT_USER",
  SET_CURRENT_SEARCH_TERM: "SET_CURRENT_SEARCH_TERM",
  SET_MAX_USER_LIMIT: "EXTEND_MAX_USER_LIMIT",

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

  setMaxUserLimit(userNumberLimit) {
    return {
      type: this.SET_MAX_USER_LIMIT,
      userNumberLimit: userNumberLimit,
    };
  },
};

export { UsersActions };
