import React, { useState } from "react";
import { useSelector } from "react-redux";
import { State } from "Store";
import { useHistory } from "react-router-dom";
import { UsersState } from "Store/users/reducer";
import UserCard from "./UserCard";
import UserDetailModal from "./UserDetailModal";

const UsersList = ({ currentPage }: { currentPage: number }) => {
  const [selectedUser, setSelectedUser] = useState(undefined);
  const { items, isGetMoreRequestLoading } = useSelector(
    (state: State): UsersState => state.users
  );
  const modalCloseHandler = () => setSelectedUser(undefined);
  const history = useHistory();
  const loadMoreHandler = () => history.push(`/?page=${currentPage + 1}`);

  return (
    <>
      <div className="top">
        <h1>Users List</h1>
        <input type="text" placeholder="Search..." />
      </div>
      <div className="users-list">
        {items.map((item) => (
          <UserCard key={item.UserID} user={item} onClick={setSelectedUser} />
        ))}
      </div>
      {selectedUser && (
        <UserDetailModal user={selectedUser} closeHandler={modalCloseHandler} />
      )}
      <div className="actions">
        {isGetMoreRequestLoading && (
          <>
            <progress />
            <br />
            <br />
            <br />
            <br />
          </>
        )}
        <button onClick={loadMoreHandler} disabled={isGetMoreRequestLoading}>
          <span>LOAD MORE</span>
        </button>
      </div>
    </>
  );
};

export default UsersList;
