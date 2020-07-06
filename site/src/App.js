import React from "react";
import { Provider } from "react-redux";
import ReduxThunk from "redux-thunk";
import { applyMiddleware, createStore } from "redux";

import AppSyncUserServiceProvider from "./provider/AppSyncUserServiceProvider.js";
import UserListContainer from "./container/UserList/UserList.js";
import UsersReducer from "./redux/Users/UsersReducer.js";

function App() {
  const DocumentStore = createStore(UsersReducer, applyMiddleware(ReduxThunk));
  let appSyncProvider = new AppSyncUserServiceProvider(DocumentStore);
  window.appSyncProvider = appSyncProvider;
  return (
    <div>
      <Provider store={DocumentStore}>
        <UserListContainer></UserListContainer>
      </Provider>
    </div>
  );
}

export default App;
