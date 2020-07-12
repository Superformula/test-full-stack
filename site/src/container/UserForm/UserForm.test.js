import React from "react";
import { waitFor } from "@testing-library/dom";
import "mutationobserver-shim";
import { createStore } from "redux";
import { render, screen, fireEvent } from "@testing-library/react";
import { Provider } from "react-redux";

import UsersReducer from "../../redux/Users/UsersReducer.js";

import { UsersActions } from "../../redux/Users/UsersActions.js";
import TestIds from "../../utils/testIds.js";
import UserFormContainer from "./UserForm.js";
import AppSyncUserServiceProvider from "../../provider/AppSyncUserServiceProvider.js";

jest.mock("../../components/Map/Map.js", () => {
  return () => {
    return <></>;
  };
});

jest.mock("../../provider/AppSyncUserServiceProvider.js");

describe("UserForm", () => {
  let userStore = null;
  beforeEach(() => {
    jest.clearAllMocks();
    userStore = createStore(UsersReducer);
    render(
      <Provider store={userStore}>
        <UserFormContainer />
      </Provider>
    );
  });

  test("Show user form with Create new user label", () => {
    let screenElement = screen.getByTestId(TestIds.UserFormScreenTitle);
    expect(screenElement).toHaveTextContent("Create New User");
  });

  test("Show user form with edit user label and with form field fill in", () => {
    userStore.dispatch(
      UsersActions.setCurrentUser({
        id: "some id",
        name: "test",
        description: "description",
        address: "address test",
      })
    );

    let nameFieldElement = screen.getByTestId(TestIds.UserNameField);
    let descriptionElement = screen.getByTestId(TestIds.UserDescriptionField);
    let userAddressElement = screen.getByTestId(TestIds.UserAddressField);
    expect(nameFieldElement).toHaveValue("test");
    expect(descriptionElement).toHaveValue("description");
    expect(userAddressElement).toHaveValue("address test");
  });

  // TODO reseach on how to mock the useForm stuff.
  test("Submit form with no name set, addUser does not get call", async () => {
    const addUserMock = jest.fn();

    AppSyncUserServiceProvider.addUser = addUserMock.mockReturnValue(
      Promise.resolve({})
    );
    let submitButton = screen.getByTestId(TestIds.UserFormSubmitButton);
    submitButton.click();

    expect.assertions(1);
    await waitFor(() => expect(addUserMock).toHaveBeenCalledTimes(0));
  });

  test("Submit form with name set, addUser gets call", async () => {
    let addUserMock = jest.fn();

    AppSyncUserServiceProvider.addUser = addUserMock.mockReturnValue(
      Promise.resolve({})
    );

    let userNameField = screen.getByTestId(TestIds.UserNameField);
    let submitButton = screen.getByTestId(TestIds.UserFormSubmitButton);
    await fireEvent.change(userNameField, { target: { value: "test" } });
    await fireEvent.click(submitButton);

    await waitFor(() => expect(addUserMock).toHaveBeenCalledTimes(1));
  });

  test("Submit form with name and id, updateUser gets call", async () => {
    userStore.dispatch(
      UsersActions.setCurrentUser({
        id: "id",
        name: "test",
        description: "description",
        address: "address test",
      })
    );

    let updateUserMock = jest.fn();

    AppSyncUserServiceProvider.updateUser = updateUserMock.mockReturnValue(
      Promise.resolve({})
    );
    let submitButton = screen.getByTestId(TestIds.UserFormSubmitButton);
    submitButton.click();
    await waitFor(() => expect(updateUserMock).toHaveBeenCalledTimes(1));
  });
});
