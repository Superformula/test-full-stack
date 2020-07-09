import "../EnvironmentVariable.js";
import "@jest/globals";
import { expect } from "@jest/globals";

import { handler } from "../../../src/lambda/addUser.js";
import { handler as getUserHandler } from "../../../src/lambda/getUser.js";
import { handler as deleteUserHandle } from "../../../src/lambda/deleteUser.js";
import UserServiceError from "../../../src/error/UserServiceError.js";

describe("addUser", () => {
  beforeAll(async () => {
    jest.setTimeout(30000);
  });

  test(`Valid input pass in, user successfully created on the backend`, async () => {
    let user = await handler({
      input: {
        name: `New valid user`,
        dateOfBirth: new Date().valueOf(),
        address: `New valid address`,
        description: `New valid description`,
      },
    });

    let returnItem = await getUserHandler({
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
      handler({
        input: {
          name: null,
        },
      })
    ).rejects.toThrowError(UserServiceError);
  });

  test(`Invalid input with id pass in, UserServiceError Thrown`, async () => {
    await expect(
      handler({
        input: {
          id: "some id",
          name: "some name",
        },
      })
    ).rejects.toThrowError(UserServiceError);
  });
});
