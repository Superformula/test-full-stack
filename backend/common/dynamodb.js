const AWS = require('aws-sdk');

let client

const initializeClient = (dynamoDB) => {
  client = dynamoDB ? dynamoDB : new AWS.DynamoDB.DocumentClient()
}

const getClient = () => {
  return client
}

const clearInstance = () => {
  client = null
}

exports.client = {
  clearInstance,
  initializeClient,
  getClient
}
