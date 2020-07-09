import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useHistory } from "react-router-dom";
import { State, ThunkDispatch } from "Store";
import { User, UsersState } from "Store/users/reducer";
import { setFilterInputValue } from "Store/users/thinks";
import UserCard from "./UserCard";
import UserDetailModal from "./UserDetailModal";

const UsersList = ({ currentPage }: { currentPage: number }) => {
  const [selectedUser, setSelectedUser] = useState(undefined);
  const {
    items,
    isGetMoreRequestLoading,
    filter,
    apiFilteredItems,
    isGetFilteredRequestLoading,
  } = useSelector((state: State): UsersState => state.users);
  const dispatch: ThunkDispatch = useDispatch();
  const modalCloseHandler = () => setSelectedUser(undefined);
  const searchInputChangeHandler = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { value } = e.target;

    dispatch(setFilterInputValue(value));
  };
  const history = useHistory();
  const loadMoreHandler = () => history.push(`/?page=${currentPage + 1}`);
  const displayItems =
    isGetFilteredRequestLoading || apiFilteredItems.length === 0
      ? searchItems({ items, filter })
      : apiFilteredItems;
  const hasFilterText = filter.trim().length > 0;
  const hasDisplayItems = displayItems.length > 0;

  return (
    <>
      <div className="top">
        <h1>Users List</h1>
        <input
          type="text"
          placeholder="Search..."
          value={filter}
          onChange={searchInputChangeHandler}
        />
      </div>
      <div className="users-list">
        {displayItems.map((item) => (
          <UserCard key={item.UserID} user={item} onClick={setSelectedUser} />
        ))}
      </div>
      {!hasDisplayItems && hasFilterText && <h2>No matching items.</h2>}
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
        {apiFilteredItems.length === 0 && filter.trim().length === 0 && (
          <button onClick={loadMoreHandler} disabled={isGetMoreRequestLoading}>
            <span>LOAD MORE</span>
          </button>
        )}
      </div>
    </>
  );
};

const searchItems = ({
  items,
  filter,
}: {
  items: Array<User>;
  filter: string;
}): Array<User> => {
  const sanitize = (str: string): string => str.trim().toLowerCase();
  const sanitizedSearchValue = sanitize(filter);
  const filterFn = (item: User) => {
    const fieldKeys = ["name", "description", "address"];
    const fieldMatches = fieldKeys.filter((key) => {
      // @ts-ignore
      const value = item[key];

      return sanitize(value).indexOf(sanitizedSearchValue) !== -1;
    });

    return fieldMatches.length > 0;
  };

  return items.filter(filterFn);
};

export default UsersList;
