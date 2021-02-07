const { client: { initializeClient, clearInstance } } = require('../common/dynamodb')

const setupMockClient = (operation, data, err = null) => {
  initializeClient(documentClient(operation, data, err))
}

const documentClient = (operation, data, rej) => {
  return {
    [operation]: () => ({
      promise: () => {
        if (!rej) {
          return Promise.resolve(data)
        }
        return Promise.reject(rej)
      }
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
