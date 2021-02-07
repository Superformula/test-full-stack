const moment = require('moment');
const { client: { getClient } } = require('../../common/dynamodb')
const { getRandomHash } = require('../../common/hash')
const TABLE_NAME = 'Users';

const createUser = (args) => {
  const { name, dob, address, description } = args
  const date = moment.utc(dob)
  if (!date.isValid()) {
    throw new Error('Invalid date format for field: [dob]')
  }

  if (!name || !address || !description) {
    throw new Error('Invalid empty input for one of the fields: [name, address, description]')
  }

  const id = getRandomHash()
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

  return getClient().put(params)
    .promise()
    .then(_ => {
      return id
    })
    .catch(error => {
      throw new Error('Something bad happened: ' + error)
    })
};

const updateUser = (args) => {
  const { id, name, address, description } = args;
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
  return getClient().update(params)
    .promise()
    .then(_ => true)
    .catch(error => {
      if (error.code === 'ConditionalCheckFailedException') {
        throw new Error(`User with id does not exists: [${id}]`)
      }
      throw new Error('Something bad happened: ' + error)
    })
};

const deleteUser = (args) => {
  const { id } = args;
  const params = {
    TableName: TABLE_NAME,
    Key: {
      id,
    },
  };
  return getClient().delete(params)
    .promise()
    .then(_ => true)
    .catch(error => {
      throw new Error('Something bad happened: ' + error)
    })
}

exports.userMutations = {
  createUser,
  updateUser,
  deleteUser
}

