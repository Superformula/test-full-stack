import React from "react";
import { connect } from "react-redux";
import styled from "styled-components";
import UserCard from "../../components/UserCard/UserCard";

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
        return userCard(item);
      })}
    </UserListPanel>
  );
};

function userCard(item) {
  return <UserCard key={item.id} user={item} />;
}

const UserListMapStateToProps = function (state) {
  return {
    users: state.users,
  };
};

const UserListContainer = connect(UserListMapStateToProps)(UserList);

export default UserListContainer;
