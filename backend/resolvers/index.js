const moment = require('moment');
const AWS = require('aws-sdk');
const dynamoDb = new AWS.DynamoDB.DocumentClient();
// TODO: Change for process.env.TABLE_NAME
const TABLE_NAME = 'Users';

exports.resolvers = {
  Query: {
    getUsers: (_, args) => {
      const { limit, lastKey, name } = args;

      if (!limit) {
        throw new Error('Invalid input field cannot be 0: [limit]')
      }

      let params = {
        TableName: 'Users',
        ExpressionAttributeValues: {
          ':name': name || ''
        },
        FilterExpression: 'contains (#name, :name)',
        ExpressionAttributeNames: { "#name": "name" },
        Limit: limit,
      };

      if (lastKey) {
        params = { ...params, ExclusiveStartKey: { id: lastKey } };
      }

      return dynamoDb.scan(params)
        .promise()
        .then(result => {
          return {
            data: result.Items,
            lastKey: result.LastEvaluatedKey ? result.LastEvaluatedKey['id'] : null
          }
        })
        .catch(error => {
          throw new Error('Something bad happened: ' + error)
        })
    },
  },
  Mutation: {
    createUser: (_, args) => {
      const { name, dob, address, description } = args
      const date = moment.utc(dob)
      if (!date.isValid()) {
        throw new Error('Invalid date format for field: [dob]')
      }

      if (!name || !address || !description) {
        throw new Error('Invalid empty input for one of the fields: [name, address, description]')
      }

      const id = Math.random().toString(36).substring(2)
      const now = moment.utc().valueOf()
      const item = {
        id,
        name,
        dob,
        address,
        description,
        createdAt: now,
        updatedAt: now
      };
      const params = {
        Item: item,
        TableName: TABLE_NAME
      };

      return dynamoDb.put(params)
        .promise()
        .then(_ => {
          return id
        })
        .catch(error => {
          throw new Error('Something bad happened: ' + error)
        })
    },
    updateUser: (_, args) => {
      const { id, name, address, description } = args
      const params = {
        TableName: TABLE_NAME,
        Key: {
          'id': id,
        },
        UpdateExpression: 'set #name = :n, address = :a, description = :d',
        ExpressionAttributeValues: {
          ':n': name,
          ':a': address,
          ':d': description
        },
        ExpressionAttributeNames: {
          "#name": "name"
        },
        ConditionExpression: 'attribute_exists(id)'
      };
      return dynamoDb.update(params)
        .promise()
        .then(_ => true)
        .catch(error => {
          if (error.code === 'ConditionalCheckFailedException') {
            throw new Error(`User with id does not exists: [${id}]`)
          }
          throw new Error('Something bad happened: ' + error)
        })
    }
  }
}
