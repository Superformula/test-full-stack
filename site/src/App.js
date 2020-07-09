import React, { useState } from "react";
import { Provider } from "react-redux";
import ReduxThunk from "redux-thunk";
import { applyMiddleware, createStore } from "redux";
import { ModalProvider, BaseModalBackground } from "styled-react-modal";
import styled from "styled-components";

import AppSyncUserServiceProvider from "./provider/AppSyncUserServiceProvider.js";
import UserListContainer from "./container/UserList/UserList.js";
import UsersReducer from "./redux/Users/UsersReducer.js";
import UserFormModal from "./container/UserForm/UserFormModal.js";
import { UsersActions } from "./redux/Users/UsersActions.js";
import HeaderBar from "./components/HeaderBar/HeaderBar";

const FadingBackground = styled(BaseModalBackground)`
  opacity: ${(props) => props.opacity};
  transition: opacity ease 500ms;
`;

const userStore = createStore(UsersReducer, applyMiddleware(ReduxThunk));
AppSyncUserServiceProvider.init(userStore);

const App = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [opacity, setOpacity] = useState(0);

  let openModalFunc = (user) => {
    userStore.dispatch(UsersActions.setCurrentUser(user));
    setIsOpen(true);
    setTimeout(() => {
      setOpacity(1);
    }, 100);
  };

  let closeModalFunc = () => {
    setOpacity(0);
    setTimeout(() => {
      setIsOpen(false);
    }, 100);
  };

  return (
    <div>
      <Provider store={userStore}>
        <HeaderBar onNewUserClick={openModalFunc} />
        <UserListContainer openModalFunc={openModalFunc} />
        <ModalProvider backgroundComponent={FadingBackground}>
          <UserFormModal
            opacity={opacity}
            isOpen={isOpen}
            closeModal={closeModalFunc}
          />
        </ModalProvider>
      </Provider>
    </div>
  );
};

export default App;
