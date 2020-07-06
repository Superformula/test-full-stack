import "../IntegrationTestEnvironment.js";
import "@jest/globals";
import { handle } from "../../../src/lambda/getUser.js";
import { expect } from "@jest/globals";
import UserServiceError from "../../../src/error/UserServiceError";

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
