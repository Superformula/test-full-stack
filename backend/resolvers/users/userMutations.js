const moment = require('moment');
const { client: { getClient } } = require('../../common/dynamodb')
const { ValidationError } = require('../../common/resolverErrors')
const { getRandomHash } = require('../../common/hash')

const TABLE_NAME = process.env.DYNAMODB_TABLE;
const DEFAULT_DATE_FORMAT = 'YYYY-MM-DD'

const createUser = (args) => {
  const { name, dob, address, description } = args
  const date = moment(dob, DEFAULT_DATE_FORMAT)
  if (!date.isValid()) {
    throw new ValidationError('Invalid date format for field: [dob]; Format should be: ' + DEFAULT_DATE_FORMAT)
  }

  if (!name || !address || !description) {
    throw new ValidationError('Invalid empty input for one of the fields: [name, address, description]')
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
  if (!name || !address || !description) {
    throw new ValidationError('Invalid empty input for one of the fields: [name, address, description]')
  }

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

