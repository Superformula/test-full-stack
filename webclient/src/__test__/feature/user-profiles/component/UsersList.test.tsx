/* eslint-disable */
import "@testing-library/jest-dom/extend-expect";
import { render, screen } from "@testing-library/react";
import * as React from "react";
import { UsersList } from "../../../../feature/user-profiles/component";
import { container } from "../../../mock/DependencyContext.mock";
import { UserProfilesModel } from "../../../mock/UserProfilesModel.mock";

jest.mock(
  "../../../../common/context/DependencyContext",
  () => require("../../../mock/DependencyContext.mock").default
);

describe("UsersList", () => {
  test("it should display 'loading' state on first render", () => {
    jest
      .spyOn(
        container.get<UserProfilesModel>(UserProfilesModel.type),
        "useGetUsersQuery"
      )
      .mockImplementation(() => ({
        execute: jest.fn(),
        loading: true,
      }));

    render(
      <UsersList
        onDisplayCreateUserModal={() => null}
        onUpdateUserItem={() => null}
      />
    );

    expect(screen.getByText("Loading...")).toBeInTheDocument();
  });
});
