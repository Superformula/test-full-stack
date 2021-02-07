const { client: { initializeClient, clearInstance } } = require('../common/dynamodb')

const setupMockClient = (operation, data) => {
  initializeClient(documentClient(operation, data))
}

const documentClient = (operation, data) => {
  return {
    [operation]: () => ({
      promise: () => Promise.resolve(data)
    })
  }
}

const resetMockClient = () => {
  clearInstance()
}

exports.utils = {
  setupMockClient,
  resetMockClient
}
