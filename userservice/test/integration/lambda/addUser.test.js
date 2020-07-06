import "../IntegrationTestEnvironment.js";
import "@jest/globals";

import { handle } from "../../../src/lambda/addUser.js";
import { handle as getUserHandle } from "../../../src/lambda/getUser.js";
import { handle as deleteUserHandle } from "../../../src/lambda/deleteUser.js";
import { expect } from "@jest/globals";
import UserServiceError from "../../../src/error/UserServiceError";

describe("addUser", () => {
  beforeAll(async () => {
    jest.setTimeout(30000);
  });

  test(`Valid input pass in, user successfully created on the backend`, async () => {
    let user = await handle({
      input: {
        name: `New valid user`,
        dateOfBirth: new Date().valueOf(),
        address: `New valid address`,
        description: `New valid description`,
      },
    });

    let returnItem = await getUserHandle({
      input: user,
    });

    expect(returnItem.id).toBe(user.id);
    expect(returnItem.createdAt).toBe(user.createdAt);
    expect(returnItem.name).toBe(user.name);
    expect(returnItem.dateOfBirth).toBe(user.dateOfBirth);
    expect(returnItem.address).toBe(user.address);
    expect(returnItem.description).toBe(user.description);

    await deleteUserHandle({ input: returnItem });
  });

  test(`Invalid input with empty name pass in, UserServiceError Thrown`, async () => {
    await expect(
      handle({
        input: {
          name: null,
        },
      })
    ).rejects.toThrowError(UserServiceError);
  });

  test(`Invalid input with id pass in, UserServiceError Thrown`, async () => {
    await expect(
      handle({
        input: {
          id: "some id",
          name: "some name",
        },
      })
    ).rejects.toThrowError(UserServiceError);
  });
});
