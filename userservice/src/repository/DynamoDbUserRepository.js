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
      Limit: limit,
    };

    if (startKey) {
      params.ExclusiveStartKey = fromJsonToKey(startKey);
    }

    if (filter) {
      params.FilterExpression = "contains (searchName, :name)";
      params.ExpressionAttributeValues[":name"] = filter.toLowerCase();
    }

    let data = null;
    do {
      if (data && data.LastEvaluatedKey) {
        params.ExclusiveStartKey = data.LastEvaluatedKey;
      }
      data = await db.query(params).promise();
      data.Items.forEach((item) => {
        if (result.length >= limit) {
          return;
        }
        result.push(User.fromJsonObject(item));
      });
    } while (result.length < limit && data.LastEvaluatedKey);

    return result;
  }

  async getUser(user) {
    let db = getDynamoDb();

    const param = {
      Key: fromJsonToKey(user),
      TableName: getTableName(),
    };

    let userOutput = await db.get(param).promise();

    return User.fromJsonObject(userOutput.Item);
  }

  async addUser(user) {
    let db = getDynamoDb();
    user = userToItem(user);
    const param = {
      Item: user,
      TableName: getTableName(),
    };
    await db.put(param).promise();
    return user;
  }

  async deleteUser(user) {
    let db = getDynamoDb();
    const param = {
      Key: fromJsonToKey(user),
      TableName: getTableName(),
      ReturnValues: "ALL_OLD",
    };

    await db.delete(param).promise();

    return user;
  }

  async updateUser(user) {
    let currentUser = await this.getUser(user);
    let item = userToItem(user);

    let db = getDynamoDb();

    const param = {
      Key: fromJsonToKey(item),
      TableName: getTableName(),
      UpdateExpression: `
        set #name = :name,         
        searchName = :searchName, 
        dateOfBirth = :dateOfBirth, 
        address = :address,
        description = :description,
        updatedAt = :updatedAt,
        createdAt = :createdAt`,
      ExpressionAttributeValues: {
        ":name": item.name,
        ":searchName": item.searchName,
        ":dateOfBirth": item.dateOfBirth,
        ":address": item.address,
        ":description": item.description,
        ":updatedAt": item.updatedAt,
        ":createdAt": currentUser ? currentUser.createdAt : item.createdAt,
      },
      ExpressionAttributeNames: { "#name": "name" },
    };

    await db.update(param).promise();
    return item;
  }
}

function userToItem(user) {
  let now = new Date().valueOf();
  return {
    pk: "REGULAR_USER",
    id: user.id ? user.id : `${now}_${uuidv4()}`,
    name: user.name,
    searchName: user.name.toLowerCase(),
    dateOfBirth: user.dateOfBirth,
    address: user.address,
    description: user.description,
    createdAt: user.createdAt ? user.createdAt : now,
    updatedAt: now,
  };
}

function fromJsonToKey(user) {
  return {
    pk: "REGULAR_USER",
    id: user.id,
  };
}
