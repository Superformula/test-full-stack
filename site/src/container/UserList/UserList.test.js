import React from "react";
import { render, screen } from "@testing-library/react";
import { Provider } from "react-redux";
import { createStore } from "redux";

import UsersReducer from "../../redux/Users/UsersReducer.js";
import TestIds from "../../utils/testIds";
import { UsersActions } from "../../redux/Users/UsersActions";
import UserListContainer from "./UserList";

describe("UserList", () => {
  const userStore = createStore(UsersReducer);
  beforeEach(() => {
    jest.clearAllMocks();
    render(
      <Provider store={userStore}>
        <UserListContainer />
      </Provider>
    );
  });

  test("User list contains filter clear button with search term being set", () => {
    userStore.dispatch(UsersActions.setCurrentSearchTerm("test"));

    let screenElement = screen.getByTestId(TestIds.FilterClear);
    expect(screenElement).toBeInTheDocument();
  });

  test("User list should have 3 user card", () => {
    userStore.dispatch(
      UsersActions.setUsers([
        { id: "abc", name: "test", description: "hello" },
        { id: "abc1", name: "test", description: "hello" },
        { id: "abc2", name: "test", description: "hello" },
      ])
    );

    let screenElements = screen.getAllByTestId(TestIds.UserCard);
    expect(screenElements.length).toBe(3);
  });

  test("User list contains load more button", () => {
    let users = [];
    for (let i = 0; i < process.env.REACT_APP_USERS_NUMBER_LIMIT; i++) {
      users.push({ id: `abc${i}`, name: "test", description: "hello" });
    }
    userStore.dispatch(UsersActions.setUsers(users));

    let screenElement = screen.getByTestId(TestIds.LoadMoreButton);
    expect(screenElement).toBeInTheDocument();
  });
});
