import "@jest/globals";
import { expect, jest } from "@jest/globals";

import DynamoDbUserRepository from "../../../src/repository/DynamoDbUserRepository.js";
import { getDynamoDb, getTableName } from "../../../src/repository/getDynamoDB";

jest.mock("../../../src/repository/getDynamoDB.js");

// Note only unit testing the logic of the do while loop for getUsers.
// That is the only piece of code that contains logic.  The rest of the
// function are one straight path.

describe("DynamoDbUserRepository", () => {
  beforeEach(() => {
    jest.clearAllMocks();
    getTableName.mockImplementation(() => {
      return "Fake Table";
    });
  });

  describe("getUsers", () => {
    test("Valid input with a limit of 10, DynamoDB query return one item with a LastEvaluatedKey. Return only 10 items. ", async () => {
      makeQueryMock([{}], { id: "fake key" });
      let dynamoDbUserRepository = new DynamoDbUserRepository();
      let items = await dynamoDbUserRepository.getUsers("some filter", 10, {
        id: "fake key",
      });
      expect(items.length).toBe(10);
    });

    test("Valid input with a limit of 1, DynamoDB query two item. Return only 1 item. ", async () => {
      makeQueryMock([{}, {}], { id: "fake key" });
      let dynamoDbUserRepository = new DynamoDbUserRepository();
      let items = await dynamoDbUserRepository.getUsers("some filter", 1, {
        id: "fake key",
      });
      expect(items.length).toBe(1);
    });

    test("Valid input with a limit of 10, DynamoDB query return one item with a empty LastEvaluatedKey. Return only 1 items. ", async () => {
      makeQueryMock([{}], { id: "fake key" });
      let dynamoDbUserRepository = new DynamoDbUserRepository();
      let items = await dynamoDbUserRepository.getUsers(
        "some filter",
        10,
        null
      );
      expect(items.length).toBe(10);
    });

    function makeQueryMock(items, key) {
      getDynamoDb.mockImplementation(() => {
        return {
          query: (param) => {
            return {
              promise: async () => {
                return {
                  Items: items,
                  LastEvaluatedKey: key,
                };
              },
            };
          },
        };
      });
    }
  });
});
