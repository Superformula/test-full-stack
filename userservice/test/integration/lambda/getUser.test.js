import "../IntegrationTestEnvironment.js";
import "@jest/globals";
import { expect } from "@jest/globals";

import UserServiceError from "../../../src/error/UserServiceError.js";
import { handle } from "../../../src/lambda/getUser.js";

describe("getUsers", () => {
  beforeAll(async () => {
    jest.setTimeout(30000);
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
