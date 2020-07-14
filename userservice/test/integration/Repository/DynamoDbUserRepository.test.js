import "../EnvironmentVariable.js";
import "@jest/globals";
import { afterAll, beforeAll, beforeEach, expect, jest } from "@jest/globals";

import DynamoDbUserRepository from "../../../src/repository/DynamoDbUserRepository.js";
import User from "../../../src/model/User.js";

describe("DynamoDbUserRepository", () => {
  let dynamoDbUserRepository = null;
  let users = [];
  beforeAll(async () => {
    jest.setTimeout(50000);
    dynamoDbUserRepository = new DynamoDbUserRepository();
    for (let i = 0; i < 2000; i++) {
      let user = new User();
      user.name = `user ${1}`;
      let item = await dynamoDbUserRepository.addUser(user);
      users.push(item);
    }
  });

  afterAll(async () => {
    for (let i = 0; i < users.length; i++) {
      await dynamoDbUserRepository.deleteUser(users[i]);
    }
  });

  let table = [];
  for (let i = 0; i < 100; i++) {
    let randomNumber = Math.round((Math.random() * 2000) % 2000);
    table.push([randomNumber, randomNumber]);
  }

  it.each(table)(
    "Valid input with a limit of Random Items, DynamoDB query return random number (%i) of items with a LastEvaluatedKey. Return the correct number (%i) of items with a limit. ",
    async (numOfItems) => {
      let items = await dynamoDbUserRepository.getUsers(
        "user",
        numOfItems,
        null
      );
      expect(items.length).toBe(numOfItems);
    }
  );
});
