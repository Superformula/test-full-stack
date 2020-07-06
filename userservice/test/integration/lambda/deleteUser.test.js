import "../IntegrationTestEnvironment.js";
import "@jest/globals";

import { handle as getUserHandle } from "../../../src/lambda/getUser.js";
import { handle as addUserHandle } from "../../../src/lambda/addUser.js";
import { handle } from "../../../src/lambda/deleteUser";
import { v4 as uuidv4 } from "uuid";
import { expect } from "@jest/globals";
import UserServiceError from "../../../src/error/UserServiceError";

describe("deleteUser", () => {
  beforeAll(async () => {
    jest.setTimeout(30000);
  });

  test(`Valid input pass in, user successfully deleted on the backend`, async () => {
    let item = await addUserHandle({
      input: {
        name: `user to be deleted`,
        dateOfBirth: new Date().valueOf(),
        address: ``,
        description: ``,
      },
    });

    await handle({
      input: item,
    });

    let returnItem = await getUserHandle({
      input: item,
    });

    expect(returnItem).toBeNull();
  });

  test(`Valid input pass in with a id that does not exist, nothing happens in the backend`, async () => {
    await handle({
      input: {
        id: uuidv4(),
      },
    });
  });

  test(`Invalid input pass in with a empty id, UserServiceError thrown`, async () => {
    await expect(
      handle({
        input: {
          id: null,
        },
      })
    ).rejects.toThrowError(UserServiceError);
  });
});
