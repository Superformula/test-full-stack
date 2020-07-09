import "../EnvironmentVariable.js";
import "@jest/globals";

import { handler as getUserHandler } from "../../../src/lambda/getUser.js";
import { handler as addUserHandler } from "../../../src/lambda/addUser.js";
import { handler } from "../../../src/lambda/deleteUser";
import { v4 as uuidv4 } from "uuid";
import { expect } from "@jest/globals";
import UserServiceError from "../../../src/error/UserServiceError.js";

describe("deleteUser", () => {
  beforeAll(async () => {
    jest.setTimeout(30000);
  });

  test(`Valid input pass in, user successfully deleted on the backend`, async () => {
    let item = await addUserHandler({
      input: {
        name: `user to be deleted`,
        dateOfBirth: new Date().valueOf(),
        address: ``,
        description: ``,
      },
    });

    await handler({
      input: item,
    });

    let returnItem = await getUserHandler({
      input: item,
    });

    expect(returnItem).toBeNull();
  });

  test(`Valid input pass in with a id that does not exist, nothing happens in the backend`, async () => {
    await handler({
      input: {
        id: uuidv4(),
      },
    });
  });

  test(`Invalid input pass in with a empty id, UserServiceError thrown`, async () => {
    await expect(
      handler({
        input: {
          id: null,
        },
      })
    ).rejects.toThrowError(UserServiceError);
  });
});
