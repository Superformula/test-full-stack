import "@jest/globals";
import { expect, jest } from "@jest/globals";

import UserService from "../../../src/service/UserService.js";
import DynamoDbUserRepository from "../../../src/repository/DynamoDbUserRepository.js";
import User from "../../../src/model/User";
import { handler } from "../../../src/lambda/getUser";
import UserServiceError from "../../../src/error/UserServiceError";

jest.mock("../../../src/repository/DynamoDbUserRepository.js");

describe("UserService", () => {
  let userService = null;
  let dynamoDbUserRepositoryMock = null;

  beforeEach(() => {
    jest.clearAllMocks();
    dynamoDbUserRepositoryMock = new DynamoDbUserRepository();
    userService = new UserService({
      userRepository: dynamoDbUserRepositoryMock,
    });
  });

  describe("getUsers", () => {
    test(`Valid input pass in, User Repository return list of users. Return the list of item with a startKey id of the last user in the list`, async () => {
      const mockGetUsers = jest.fn();
      dynamoDbUserRepositoryMock.getUsers = mockGetUsers;
      let items = [
        {
          id: "Last Key",
        },
      ];
      mockGetUsers.mockReturnValue(Promise.resolve(items));

      let result = await userService.getUsers("filter", 10, { id: "key" });

      expect(result.items).toBe(items);
      expect(result.startKey.id).toBe(items[0].id);
    });

    test(`Valid input pass in with null startKey, User Repository return empty list of users. Return object with empty items and startKey null`, async () => {
      const mockGetUsers = jest.fn();
      dynamoDbUserRepositoryMock.getUsers = mockGetUsers;
      let emptyArray = [];
      mockGetUsers.mockReturnValue(Promise.resolve(emptyArray));

      let result = await userService.getUsers("filter", 10, null);

      expect(result.items).toBe(emptyArray);
      expect(result.startKey).toBe(null);
    });
  });

  describe("getUser", () => {
    test(`Valid input pass in, User Repository return a single user. Return that single user`, async () => {
      const mockGetUser = jest.fn();
      dynamoDbUserRepositoryMock.getUser = mockGetUser;

      let user = new User();
      user.id = "fake id";

      mockGetUser.mockReturnValue(Promise.resolve(user));

      let result = await userService.getUser(user);

      expect(result).toBe(user);
    });

    test(`Invalid input pass in with null id. Throw UserServiceError`, async () => {
      let user = new User();
      await expect(userService.getUser(user)).rejects.toThrowError(
        UserServiceError
      );
    });
  });

  describe("addUser", () => {
    test(`Valid input pass in, User Repository calls addUser. Return that added user`, async () => {
      const mockAddUser = jest.fn();
      dynamoDbUserRepositoryMock.addUser = mockAddUser;

      let user = new User();
      user.name = "New User";

      mockAddUser.mockReturnValue(Promise.resolve(user));

      let result = await userService.addUser(user);

      expect(result).toBe(user);
      expect(mockAddUser).toBeCalledTimes(1);
    });

    test(`Invalid input pass in with non empty id, Throw UserServiceError`, async () => {
      let user = new User();
      user.id = "Id";
      user.name = "New User";

      await expect(userService.addUser(user)).rejects.toThrowError(
        UserServiceError
      );
    });

    test(`Invalid input pass in with empty name, Throw UserServiceError`, async () => {
      let user = new User();
      user.name = "";

      await expect(userService.addUser(user)).rejects.toThrowError(
        UserServiceError
      );
    });
  });

  describe("updateUser", () => {
    test(`Valid input pass in, User Repository calls updateUser. Return that updated user`, async () => {
      const mockUpdateUser = jest.fn();
      dynamoDbUserRepositoryMock.updateUser = mockUpdateUser;

      let user = new User();
      user.id = "Id";
      user.name = "New User";

      mockUpdateUser.mockReturnValue(Promise.resolve(user));

      let result = await userService.updateUser(user);

      expect(result).toBe(user);
      expect(mockUpdateUser).toBeCalledTimes(1);
    });

    test(`Invalid input pass in with empty id, Throw UserServiceError`, async () => {
      let user = new User();
      user.name = "New User";

      await expect(userService.updateUser(user)).rejects.toThrowError(
        UserServiceError
      );
    });

    test(`Invalid input pass in with empty name, Throw UserServiceError`, async () => {
      let user = new User();
      user.id = "Id";
      user.name = "";

      await expect(userService.updateUser(user)).rejects.toThrowError(
        UserServiceError
      );
    });
  });

  describe("deleteUser", () => {
    test(`Valid input pass in, User Repository calls deleteUser. Return deleted user`, async () => {
      const mockDeleteUser = jest.fn();
      dynamoDbUserRepositoryMock.deleteUser = mockDeleteUser;

      let user = new User();
      user.id = "id";

      mockDeleteUser.mockReturnValue(Promise.resolve(user));

      let result = await userService.deleteUser(user);

      expect(result).toBe(user);
      expect(mockDeleteUser).toBeCalledTimes(1);
    });

    test(`Invalid input pass in with non empty id, Throw UserServiceError`, async () => {
      let user = new User();

      await expect(userService.deleteUser(user)).rejects.toThrowError(
        UserServiceError
      );
    });
  });
});
