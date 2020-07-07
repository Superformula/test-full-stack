import React from "react";
import * as Fa from "react-icons/fa";
import { connect } from "react-redux";
import styled from "styled-components";

import UserCard from "../../components/UserCard/UserCard.js";
import { UsersActions } from "../../redux/Users/UsersActions.js";

import AppSyncUserServiceProvider from "../../provider/AppSyncUserServiceProvider.js";

const UserListPanel = styled.div`
  display: flex;
  flex-wrap: wrap;
  min-width: 100%;
  justify-content: center;
`;

const CurrentFilterHeader = styled.div`
  align-items: center;
  justify-content: center;
  display: flex;
  svg {
    cursor: pointer;
  }
`;

const UserList = (props) => {
  let currentSearchTerm = "";
  if (props.currentSearchTerm) {
    currentSearchTerm = (
      <CurrentFilterHeader>
        Current Filter: {props.currentSearchTerm} &nbsp;
        <Fa.FaTimes
          onClick={() => {
            return AppSyncUserServiceProvider.doSearch("");
          }}
        />
      </CurrentFilterHeader>
    );
  }
  return (
    <>
      {currentSearchTerm}
      <UserListPanel>
        <br />
        {props.users.map((item) => {
          return userCard(item, props.openModalFunc);
        })}
      </UserListPanel>
    </>
  );
};

function userCard(item, openModalFunc) {
  return <UserCard key={item.id} user={item} onClick={openModalFunc} />;
}

const UserListMapStateToProps = (state) => {
  return {
    users: state.users,
    currentSearchTerm: state.currentSearchTerm,
  };
};

const UserListMapActionToProps = (dispatch) => {
  return {
    setCurrentUser: (user) => {
      dispatch(UsersActions.setCurrentUser(user));
    },
  };
};

const UserListContainer = connect(
  UserListMapStateToProps,
  UserListMapActionToProps
)(UserList);

export default UserListContainer;
