import React from "react";
import { connect } from "react-redux";
import styled from "styled-components";

import UserCard from "../../components/UserCard/UserCard";
import { UsersActions } from "../../redux/Users/UsersActions";

const UserListPanel = styled.div`
  display: flex;
  flex-wrap: wrap;
  position: absolute;
  min-width: 100%;
  justify-content: center;
  top: 81px;
  height: calc(100% - 81px);
`;

const UserList = (props) => {
  return (
    <UserListPanel>
      {props.users.map((item) => {
        return userCard(item, props.openModalFunc);
      })}
    </UserListPanel>
  );
};

function userCard(item, openModalFunc) {
  return <UserCard key={item.id} user={item} onClick={openModalFunc} />;
}

const UserListMapStateToProps = (state) => {
  return {
    users: state.users,
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
