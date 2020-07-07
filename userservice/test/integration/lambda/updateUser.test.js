import "../IntegrationTestEnvironment.js";
import "@jest/globals";
import { expect } from "@jest/globals";
import { v4 as uuidv4 } from "uuid";

import { handle } from "../../../src/lambda/updateUser.js";
import { handle as addUserHandle } from "../../../src/lambda/addUser.js";
import { handle as getUserHandle } from "../../../src/lambda/getUser.js";
import { handle as deleteUserHandle } from "../../../src/lambda/deleteUser.js";
import UserServiceError from "../../../src/error/UserServiceError.js";

describe("updateUser", () => {
  beforeEach(() => {
    jest.setTimeout(30000);
  });

  test(`Valid input pass in, user successfully updated on the backend`, async () => {
    let item = await addUserHandle({
      input: {
        name: `update user test`,
        dateOfBirth: new Date().valueOf(),
        address: `update address test`,
        description: `update description test`,
      },
    });

    let newDateOfBirth = new Date().valueOf();
    await handle({
      input: {
        id: item.id,
        name: `updated user`,
        dateOfBirth: newDateOfBirth,
        address: `updated address`,
        description: `updated description`,
      },
    });

    let returnItem = await getUserHandle({
      input: item,
    });

    expect(returnItem.id).toBe(item.id);
    expect(returnItem.createdAt).toBe(item.createdAt);
    expect(returnItem.name).toBe("updated user");
    expect(returnItem.dateOfBirth).toBe(newDateOfBirth);
    expect(returnItem.address).toBe("updated address");
    expect(returnItem.description).toBe("updated description");

    await deleteUserHandle({ input: returnItem });
  });

  test(`Valid input pass in with a new id, user successfully created on the backend`, async () => {
    let dateOfBirth = new Date().valueOf();
    let now = new Date().valueOf();
    let newUser = await handle({
      input: {
        id: `${now}_${uuidv4()}`,
        name: `new user`,
        dateOfBirth: dateOfBirth,
        address: `new address`,
        description: `new description`,
      },
    });

    let returnItem = await getUserHandle({
      input: newUser,
    });

    expect(returnItem.id).toBe(newUser.id);
    expect(returnItem.createdAt).toBe(newUser.createdAt);
    expect(returnItem.name).toBe("new user");
    expect(returnItem.dateOfBirth).toBe(dateOfBirth);
    expect(returnItem.address).toBe("new address");
    expect(returnItem.description).toBe("new description");

    await deleteUserHandle({ input: returnItem });
  });

  test(`Invalid input pass in with a null id, UserServiceError thrown`, async () => {
    await expect(
      handle({
        input: {
          id: null,
          createdAt: new Date().valueOf(),
          name: `updated user`,
          dateOfBirth: new Date().valueOf(),
          address: `valid address`,
          description: `valid description`,
        },
      })
    ).rejects.toThrowError(UserServiceError);
  });
});
