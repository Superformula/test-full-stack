import { createStore } from "redux";
import UsersReducer from "../../src/redux/Users/UsersReducer.js";
import AppSyncUserServiceProvider from "../../src/provider/AppSyncUserServiceProvider.js";

before(async () => {
  const userStore = createStore(UsersReducer);
  AppSyncUserServiceProvider.init(userStore, false);

  let numbersOfUser = await AppSyncUserServiceProvider.loadUsers(
    null,
    null,
    false
  );

  if (numbersOfUser === 0) {
    for (let i = 0; i < 12; i++) {
      let item = await AppSyncUserServiceProvider.addUser({
        name: `User ${i}`,
        address: "toronto",
        dateOfBirth: new Date().valueOf(),
        description: `User description ${i}`,
      });
    }
  }
});
