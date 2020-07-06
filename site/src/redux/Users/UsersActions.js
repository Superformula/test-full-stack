const UsersActions = {
  SET_USERS: "SET_USERS",
  REMOVE_USER: "REMOVE_USER",
  SET_CURRENT_EDIT_USER: "SET_CURRENT_EDIT_USER",

  setUsers(users) {
    return {
      type: this.SET_USERS,
      users: users,
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
};

export { UsersActions };
