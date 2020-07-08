import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { State, ThunkDispatch } from "Store";
import { UsersState } from "Store/users/reducer";
import { getMoreUsers } from "Store/users/thinks";
import UserCard from "./UserCard";
import UserDetailModal from "./UserDetailModal";

const UsersList = () => {
  const [selectedUser, setSelectedUser] = useState(undefined);
  const { items, isGetMoreRequestLoading } = useSelector(
    (state: State): UsersState => state.users
  );
  const modalCloseHandler = () => setSelectedUser(undefined);
  const dispatch: ThunkDispatch = useDispatch();
  const loadMoreHandler = () => dispatch(getMoreUsers());

  return (
    <>
      {items.map((item) => (
        <>
          <br />
          <UserCard key={item.UserID} user={item} onClick={setSelectedUser} />
        </>
      ))}
      {selectedUser && (
        <UserDetailModal user={selectedUser} closeHandler={modalCloseHandler} />
      )}
      {isGetMoreRequestLoading && <progress />}
      <button onClick={loadMoreHandler} disabled={isGetMoreRequestLoading}>
        <span>LOAD MORE</span>
      </button>
    </>
  );
};

export default UsersList;
