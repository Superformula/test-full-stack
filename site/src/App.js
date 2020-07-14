import React, { useState, useCallback } from "react";
import { Provider } from "react-redux";
import { createStore } from "redux";
import { ModalProvider, BaseModalBackground } from "styled-react-modal";
import styled from "styled-components";
import queryString from "query-string";

import AppSyncUserServiceProvider from "./provider/AppSyncUserServiceProvider.js";
import UserListContainer from "./container/UserList/UserList.js";
import UsersReducer from "./redux/Users/UsersReducer.js";
import UserFormModal from "./container/UserForm/UserFormModal.js";
import { UsersActions } from "./redux/Users/UsersActions.js";
import HeaderBarContainer from "./container/HeaderBar/HeaderBar.js";

const FadingBackground = styled(BaseModalBackground)`
  opacity: ${(props) => props.opacity};
  transition: opacity ease 500ms;
`;

const userStore = createStore(UsersReducer);

const initialize = async () => {
  await AppSyncUserServiceProvider.init(userStore, false);
};

const loadUserList = () => {
  const parsed = queryString.parse(document.location.hash);
  let limit = process.env.REACT_APP_USERS_NUMBER_LIMIT;
  if (parsed["limit"]) {
    limit = parseInt(parsed["limit"]);
  }
  AppSyncUserServiceProvider.loadUsersFromState(parsed["filter"], limit);
};

window.addEventListener("hashchange", (event) => {
  loadUserList();
});

initialize().then(() => {
  loadUserList();
});

const App = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [opacity, setOpacity] = useState(0);

  let openModalFunc = useCallback((user) => {
    userStore.dispatch(UsersActions.setCurrentUser(user));
    setIsOpen(true);
    setTimeout(() => {
      setOpacity(1);
    }, 100);
  }, []);

  let closeModalFunc = useCallback(() => {
    setOpacity(0);
    setTimeout(() => {
      setIsOpen(false);
    }, 100);
  }, []);

  return (
    <>
      <Provider store={userStore}>
        <HeaderBarContainer onNewUserClick={openModalFunc} />
        <UserListContainer onUserCardClick={openModalFunc} />
        <ModalProvider backgroundComponent={FadingBackground}>
          <UserFormModal
            opacity={opacity}
            isOpen={isOpen}
            closeModal={closeModalFunc}
          />
        </ModalProvider>
      </Provider>
    </>
  );
};

export default App;
