const UsersActionsThunk = {};

const UsersActions = {
  SET_USERS: "SET_USERS",
  SET_CURRENT_EDIT_USER: "SET_CURRENT_EDIT_USER",

  setUsers(users) {
    return {
      type: this.SET_USERS,
      users: users,
    };
  },

  setDocumentId(user) {
    return {
      type: this.SET_CURRENT_EDIT_USER,
      users: user,
    };
  },
};

export { UsersActions, UsersActionsThunk };
