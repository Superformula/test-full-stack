import React from "react";
import { connect } from "react-redux";
import styled from "styled-components";

const UserFormPanel = styled.div`
  display: flex;
`;

const UserForm = (props) => {
  return <UserFormPanel></UserFormPanel>;
};

const UserFormMapStateToProps = function (state) {
  return {
    currentUser: state.currentEditUser,
  };
};

const UserListContainer = connect(UserFormMapStateToProps)(UserForm);

export default UserListContainer;
