import "../EnvironmentVariable.js";
import "@jest/globals";
import { expect } from "@jest/globals";

import UserServiceError from "../../../src/error/UserServiceError.js";
import { handler } from "../../../src/lambda/getUser.js";

describe("getUsers", () => {
  beforeAll(async () => {
    jest.setTimeout(30000);
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
