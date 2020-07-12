import "../EnvironmentVariable.js";
import "@jest/globals";
import { afterAll, expect } from "@jest/globals";

import UserServiceError from "../../../src/error/UserServiceError.js";
import { handler } from "../../../src/lambda/UserServiceHandler.js";
import { v4 as uuidv4 } from "uuid";
import Constants from "../../../src/utils/constants.js";

describe("UserServiceHandler", () => {
  describe(Constants.GET_USERS, () => {
    beforeAll(async () => {
      jest.setTimeout(30000);
    });

    test(`Invalid input pass in with a empty id, UserServiceError thrown`, async () => {
      await expect(
        handler({
          fieldName: Constants.GET_USER,
          input: {
            id: null,
          },
        })
      ).rejects.toThrowError(UserServiceError);
    });
  });

  describe(Constants.ADD_USER, () => {
    beforeAll(async () => {
      jest.setTimeout(30000);
    });

    test(`Valid input pass in, user successfully created on the backend`, async () => {
      let user = await handler({
        fieldName: Constants.ADD_USER,
        input: {
          name: `New valid user`,
          dateOfBirth: new Date().valueOf(),
          address: `New valid address`,
          description: `New valid description`,
        },
      });

      let returnItem = await handler({
        fieldName: Constants.GET_USER,
        input: user,
      });

      expect(returnItem.id).toBe(user.id);
      expect(returnItem.createdAt).toBe(user.createdAt);
      expect(returnItem.name).toBe(user.name);
      expect(returnItem.dateOfBirth).toBe(user.dateOfBirth);
      expect(returnItem.address).toBe(user.address);
      expect(returnItem.description).toBe(user.description);

      await handler({ fieldName: "DeleteUser", input: returnItem });
    });

    test(`Invalid input with empty name pass in, UserServiceError Thrown`, async () => {
      await expect(
        handler({
          fieldName: Constants.ADD_USER,
          input: {
            name: null,
          },
        })
      ).rejects.toThrowError(UserServiceError);
    });

    test(`Invalid input with id pass in, UserServiceError Thrown`, async () => {
      await expect(
        handler({
          fieldName: Constants.ADD_USER,
          input: {
            id: "some id",
            name: "some name",
          },
        })
      ).rejects.toThrowError(UserServiceError);
    });
  });

  describe(Constants.DELETE_USER, () => {
    beforeAll(async () => {
      jest.setTimeout(30000);
    });

    test(`Valid input pass in, user successfully deleted on the backend`, async () => {
      let item = await handler({
        fieldName: Constants.ADD_USER,
        input: {
          name: `user to be deleted`,
          dateOfBirth: new Date().valueOf(),
          address: ``,
          description: ``,
        },
      });

      await handler({
        fieldName: Constants.DELETE_USER,
        input: item,
      });

      let returnItem = await handler({
        fieldName: Constants.GET_USER,
        input: item,
      });

      expect(returnItem).toBeNull();
    });

    test(`Valid input pass in with a id that does not exist, nothing happens in the backend`, async () => {
      await handler({
        fieldName: Constants.DELETE_USER,
        input: {
          id: uuidv4(),
        },
      });
    });

    test(`Invalid input pass in with a empty id, UserServiceError thrown`, async () => {
      await expect(
        handler({
          fieldName: Constants.DELETE_USER,
          input: {
            id: null,
          },
        })
      ).rejects.toThrowError(UserServiceError);
    });
  });

  describe(Constants.GET_USERS, () => {
    let seedItems = [];
    beforeAll(async () => {
      jest.setTimeout(30000);
      for (let i = 0; i < 10; i++) {
        let item = await handler({
          fieldName: Constants.ADD_USER,
          input: {
            name: `user ${i}`,
            dateOfBirth: new Date().valueOf(),
            address: `address ${i}`,
            description: `description ${i}`,
          },
        });
        seedItems.push(item);
      }

      let item = await handler({
        fieldName: Constants.ADD_USER,
        input: {
          name: `2 users`,
          dateOfBirth: new Date().valueOf(),
          address: ``,
          description: ``,
        },
      });
      seedItems.push(item);

      item = await handler({
        fieldName: Constants.ADD_USER,
        input: {
          name: `2 users`,
          dateOfBirth: new Date().valueOf(),
          address: ``,
          description: ``,
        },
      });
      seedItems.push(item);
    });

    afterAll(async () => {
      for (let i = 0; i < seedItems.length; i++) {
        await handler({
          fieldName: Constants.DELETE_USER,
          input: seedItems[i],
        });
      }
    });

    test(`Input with a limit of 6, 6 users return`, async () => {
      let result = await handler({
        fieldName: Constants.GET_USERS,
        input: {
          filter: null,
          limit: 6,
          startKey: null,
        },
      });

      expect(result.items.length).toBe(6);
      expect(result.items[5].id).toBe(seedItems[6].id);
    });

    test(`Input with a limit of 1 and a start key seedItem in index 7, User at index 6 return`, async () => {
      let result = await handler({
        fieldName: Constants.GET_USERS,
        input: {
          filter: null,
          limit: 1,
          startKey: { id: seedItems[7].id },
        },
      });

      expect(result.items.length).toBe(1);
      expect(result.items[0].id).toBe(seedItems[6].id);
    });

    test(`Input with a limit of 6 and filter with the name "2 users", 2 users return`, async () => {
      let result = await handler({
        fieldName: Constants.GET_USERS,
        input: {
          filter: "2 users",
          limit: 6,
          startKey: null,
        },
      });

      expect(result.items.length).toBe(2);
    });

    test(`Input with a limit of 6 and filter with the name "2 uSeRs", 2 users return`, async () => {
      let result = await handler({
        fieldName: Constants.GET_USERS,
        input: {
          filter: "2 uSeRs",
          limit: 6,
          startKey: null,
        },
      });

      expect(result.items.length).toBe(2);
    });

    test(`Input with a limit of 100 and filter with the name that does not exist, 0 user return`, async () => {
      let result = await handler({
        fieldName: Constants.GET_USERS,
        input: {
          filter: "that does not exist",
          limit: 100,
          startKey: null,
        },
      });

      expect(result.items.length).toBe(0);
    });
  });

  describe(Constants.UPDATE_USER, () => {
    beforeEach(() => {
      jest.setTimeout(30000);
    });

    test(`Valid input pass in, user successfully updated on the backend`, async () => {
      let item = await handler({
        fieldName: Constants.ADD_USER,
        input: {
          name: `update user test`,
          dateOfBirth: new Date().valueOf(),
          address: `update address test`,
          description: `update description test`,
        },
      });

      let newDateOfBirth = new Date().valueOf();
      let updatedItem = await handler({
        fieldName: Constants.UPDATE_USER,
        input: {
          id: item.id,
          name: `updated user`,
          dateOfBirth: newDateOfBirth,
          address: `updated address`,
          description: `updated description`,
        },
      });

      let returnItem = await handler({
        fieldName: Constants.GET_USER,
        input: item,
      });

      expect(returnItem.id).toBe(item.id);
      expect(returnItem.createdAt).toBe(item.createdAt);
      expect(returnItem.createdAt).toBe(updatedItem.createdAt);
      expect(returnItem.name).toBe("updated user");
      expect(returnItem.dateOfBirth).toBe(newDateOfBirth);
      expect(returnItem.address).toBe("updated address");
      expect(returnItem.description).toBe("updated description");

      await handler({
        fieldName: Constants.DELETE_USER,
        input: returnItem,
      });
    });

    test(`Valid input pass in with a new id, user successfully created on the backend`, async () => {
      let dateOfBirth = new Date().valueOf();
      let now = new Date().valueOf();
      let newUser = await handler({
        fieldName: Constants.UPDATE_USER,
        input: {
          id: `${now}_${uuidv4()}`,
          name: `new user`,
          dateOfBirth: dateOfBirth,
          address: `new address`,
          description: `new description`,
        },
      });

      let returnItem = await handler({
        fieldName: Constants.GET_USER,
        input: newUser,
      });

      expect(returnItem.id).toBe(newUser.id);
      expect(returnItem.createdAt).toBe(newUser.createdAt);
      expect(returnItem.name).toBe("new user");
      expect(returnItem.dateOfBirth).toBe(dateOfBirth);
      expect(returnItem.address).toBe("new address");
      expect(returnItem.description).toBe("new description");

      await handler({
        fieldName: Constants.DELETE_USER,
        input: returnItem,
      });
    });

    test(`Invalid input pass in with a null id, UserServiceError thrown`, async () => {
      await expect(
        handler({
          fieldName: Constants.UPDATE_USER,
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
});
