import "../IntegrationTestEnvironment.js";
import "@jest/globals";
import { handle } from "../../../src/lambda/getUsers.js";
import { handle as addUserHandle } from "../../../src/lambda/addUser.js";
import { handle as deleteUserHandle } from "../../../src/lambda/deleteUser.js";
import { afterAll, expect } from "@jest/globals";

describe("getUsers", () => {
  let seedItems = [];
  beforeAll(async () => {
    jest.setTimeout(30000);
    for (let i = 0; i < 10; i++) {
      let item = await addUserHandle({
        input: {
          name: `user ${i}`,
          dateOfBirth: new Date().valueOf(),
          address: `address ${i}`,
          description: `description ${i}`,
        },
      });
      seedItems.push(item);
    }
  });

  afterAll(async () => {
    for (let i = 0; i < seedItems.length; i++) {
      await deleteUserHandle({
        input: seedItems[i],
      });
    }
  });

  test(`Input with a limit of 6, 6 users return`, async () => {
    let result = await handle({
      input: {
        filter: null,
        limit: 6,
        startKey: null,
      },
    });

    expect(result.items.length).toBe(6);
    expect(result.items[5].id).toBe(seedItems[5].id);
  });

  test(`Input with a limit of 1 and a start key seedItem in index 7, User at index 8 return`, async () => {
    let result = await handle({
      input: {
        filter: null,
        limit: 1,
        startKey: { pk: "REGULAR_USER", id: seedItems[7].id },
      },
    });

    expect(result.items.length).toBe(1);
    expect(result.items[0].id).toBe(seedItems[8].id);
  });

  test(`Input with a limit of 6 and filter with the name "2 users", 2 users return`, async () => {
    let itemOne = await addUserHandle({
      input: {
        name: `2 users`,
        dateOfBirth: new Date().valueOf(),
        address: ``,
        description: ``,
      },
    });

    let itemTwo = await addUserHandle({
      input: {
        name: `2 users`,
        dateOfBirth: new Date().valueOf(),
        address: ``,
        description: ``,
      },
    });

    let result = await handle({
      input: {
        filter: "2 Users",
        limit: 6,
        startKey: null,
      },
    });

    expect(result.items.length).toBe(2);

    await deleteUserHandle({
      input: itemOne,
    });

    await deleteUserHandle({
      input: itemTwo,
    });
  });

  test(`Input with a limit of 100 and filter with the name that does not exist, 0 user return`, async () => {
    let result = await handle({
      input: {
        filter: "that does not exist",
        limit: 100,
        startKey: null,
      },
    });

    expect(result.items.length).toBe(0);
  });
});
