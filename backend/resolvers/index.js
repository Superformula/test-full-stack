const { userQueries } = require('./users/userQueries');
const { userMutations } = require('./users/userMutations');
const { client: { initializeClient }} = require('../common/dynamodb')

// TODO: Improve design by generically applying a middleware engine, and applying this MW to all the resolver functions
const argumentsMiddleware = (msj, args) => console.log(`${msj}${JSON.stringify(args)}`)
initializeClient()

exports.resolvers = {
  Query: {
    getUsers: (_, args) => {
      argumentsMiddleware('getUsers request called with args: ', args);
      return userQueries.getUsers(args);
    },
    getUserLocation: (_, args) => {
      argumentsMiddleware('getUserLocation request called with args: ', args)
      return userQueries.getUserLocation(args)
    }
  },
  Mutation: {
    createUser: (_, args) => {
      argumentsMiddleware('createUser request called with args: ', args)
      return userMutations.createUser(args);
    },
    updateUser: (_, args) => {
      argumentsMiddleware('updateUser request called with args: ', args)
      return userMutations.updateUser(args);
    },
    deleteUser: (_, args) => {
      argumentsMiddleware('deleteUser request called with args: ', args)
      return userMutations.deleteUser(args)
    }
  }
}
