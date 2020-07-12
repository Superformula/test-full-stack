import React from "react";
import { FaTimes } from "react-icons/fa";
import { connect } from "react-redux";
import styled from "styled-components";

import UserCard from "../../components/UserCard/UserCard.js";
import { UsersActions } from "../../redux/Users/UsersActions.js";

import AppSyncUserServiceProvider from "../../provider/AppSyncUserServiceProvider.js";
import { SfButton } from "../../styles/HtmlElementStyle.js";
import TestIds from "../../utils/testIds.js";

const UserListPanel = styled.div`
  display: flex;
  flex-wrap: wrap;
  padding-left: 236px;
  padding-right: 236px;
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

const LoadMoreArea = styled.div`
  display: flex;
  justify-content: center;
  margin-top: 32px;
  margin-bottom: 62px;
`;

const UserList = (props) => {
  let currentSearchTerm = "";

  if (props.currentSearchTerm) {
    currentSearchTerm = (
      <CurrentFilterHeader>
        Current Filter: {props.currentSearchTerm} &nbsp;
        <FaTimes
          data-testid={TestIds.FilterClear}
          onClick={() => {
            return AppSyncUserServiceProvider.doSearch("");
          }}
        />
      </CurrentFilterHeader>
    );
  }
  let loadMoreArea = "";
  if (
    props.users.length &&
    props.users.length % process.env.REACT_APP_USERS_NUMBER_LIMIT === 0
  ) {
    loadMoreArea = (
      <LoadMoreArea>
        <SfButton
          data-testid={TestIds.LoadMoreButton}
          onClick={async () => {
            return AppSyncUserServiceProvider.loadMore();
          }}
        >
          LOAD MORE
        </SfButton>
      </LoadMoreArea>
    );
  }

  return (
    <>
      {currentSearchTerm}
      <UserListPanel>
        <br />
        {props.users.map((item, index) => {
          return userCard(item, props.onUserCardClick);
        })}
      </UserListPanel>
      {loadMoreArea}
    </>
  );
};

function userCard(item, onUserCardClick) {
  return <UserCard key={item.id} user={item} onClick={onUserCardClick} />;
}

const UserListMapStateToProps = (state) => {
  return {
    users: state.users,
    currentSearchTerm: state.currentSearchTerm,
    userNumberLimit: state.userNumberLimit,
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
