import { createStore } from "redux";
import UsersReducer from "../../src/redux/Users/UsersReducer.js";
import AppSyncUserServiceProvider from "../../src/provider/AppSyncUserServiceProvider.js";
import { UsersActions } from "../../src/redux/Users/UsersActions";

before(async () => {
  const userStore = createStore(UsersReducer);
  await AppSyncUserServiceProvider.init(userStore);

  userStore.dispatch(UsersActions.setMaxUserLimit(100));

  await AppSyncUserServiceProvider.loadUsers(null, null, false);

  let users = userStore.getState().users;
  for (let i = 0; i < users.length; i++) {
    await AppSyncUserServiceProvider.deleteUser(users[i]);
  }

  for (let i = 0; i < 12; i++) {
    let item = await AppSyncUserServiceProvider.addUser({
      name: `User ${i}`,
      address: "toronto",
      dateOfBirth: new Date().valueOf(),
      description: `User description ${i}`,
    });
  }
});
