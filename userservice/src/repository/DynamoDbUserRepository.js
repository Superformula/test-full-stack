import { getDynamoDb, getTableName } from "./getDynamoDB.js";

import User from "../model/User.js";
import { v4 as uuidv4 } from "uuid";

export default class DynamoDbUserRepository {
  async getUsers(filter, limit = 6, startKey) {
    let result = [];
    let db = getDynamoDb();

    let params = {
      TableName: getTableName(),
      KeyConditionExpression: "pk = :REGULAR_USER",
      ExpressionAttributeValues: { ":REGULAR_USER": "REGULAR_USER" },
      ScanIndexForward: false,
      limit: limit,
    };

    if (startKey) {
      params.ExclusiveStartKey = fromJsonToKey(startKey);
    }

    if (filter) {
      params.FilterExpression = "contains (searchName, :name)";
      params.ExpressionAttributeValues[":name"] = filter.toLowerCase();
      delete params["limit"];
    }

    let data = null;
    do {
      if (data && data.LastEvaluatedKey) {
        params.ExclusiveStartKey = data.LastEvaluatedKey;
      }
      data = await db.query(params).promise();
      for (let i = 0; i < data.Items.length; i++) {
        if (result.length >= limit) {
          break;
        }
        result.push(User.fromJsonObject(data.Items[i]));
      }
    } while (result.length < limit && data.LastEvaluatedKey);

    return result;
  }

  async getUser(user) {
    let userOutput = await getUserRaw(user);
    return User.fromJsonObject(userOutput.Item);
  }

  async addUser(user) {
    let db = getDynamoDb();
    user = userToDynamoDbItem(user);
    user.image = randomImage();
    const param = {
      Item: user,
      TableName: getTableName(),
    };
    await db.put(param).promise();
    return user;
  }

  async deleteUser(user) {
    let db = getDynamoDb();
    let currentUser = await this.getUser(user);

    const param = {
      Key: fromJsonToKey(user),
      TableName: getTableName(),
    };

    await db.delete(param).promise();

    return currentUser;
  }

  async updateUser(user) {
    let item = userToDynamoDbItem(user);
    let currentUserOutput = await getUserRaw(user);
    if (currentUserOutput) {
      item.createdAt = currentUserOutput.Item.createdAt;
      let currentItem = currentUserOutput.Item;
      for (let key in item) {
        if (item[key] === undefined && currentItem[key]) {
          item[key] = currentItem[key];
        }
      }
    }

    let db = getDynamoDb();

    const param = {
      Item: item,
      TableName: getTableName(),
    };
    await db.put(param).promise();
    return item;
  }
}

async function getUserRaw(user) {
  let db = getDynamoDb();

  const param = {
    Key: fromJsonToKey(user),
    TableName: getTableName(),
  };

  return await db.get(param).promise();
}

function userToDynamoDbItem(user) {
  let now = new Date().valueOf();
  return {
    pk: "REGULAR_USER",
    id: user.id ? user.id : `${now}_${uuidv4()}`,
    name: user.name,
    image: user.image,
    searchName: user.name.toLowerCase(),
    dateOfBirth: user.dateOfBirth,
    address: user.address,
    description: user.description,
    createdAt: user.createdAt ? user.createdAt : now,
    updatedAt: now,
  };
}

function randomImage() {
  let number = Math.floor(Math.random() * 1000);
  let result = number % 2;
  let type = "women";
  if (result === 1) {
    type = "men";
  }
  let imgNum = number % 26;
  return `https://randomuser.me/api/portraits/${type}/${imgNum}.jpg`;
}

function fromJsonToKey(user) {
  return {
    pk: "REGULAR_USER",
    id: user.id,
  };
}
