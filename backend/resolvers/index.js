const { userQueries } = require('./users/userQueries');
const { userMutations } = require('./users/userMutations');
const { client: { initializeClient }} = require('../common/dynamodb')

// TODO: Improve design by generically applying a middleware engine, and applying this MW to all the resolver functions
const argumentsMiddleware = (msj, args) => console.log(`${msj}${JSON.stringify(args)}`)
initializeClient()

const resolvers = {
  Query: {
    getUsers: (_, args) => {
      return userQueries.getUsers(args);
    },
    getUserLocation: (_, args) => {
      return userQueries.getUserLocation(args)
    }
  },
  Mutation: {
    createUser: (_, args) => {
      return userMutations.createUser(args);
    },
    updateUser: (_, args) => {
      return userMutations.updateUser(args);
    },
    deleteUser: (_, args) => {
      return userMutations.deleteUser(args)
    }
  }
}

// Iterate through Query, Mutation and possibly Subscriptions and other operations in the future
Object.keys(resolvers).forEach((graphqlOperation) => {
  // Iterate through all of the endpoints
  Object.keys(resolvers[graphqlOperation]).forEach(resolver => {
    const currentResolver = resolvers[graphqlOperation][resolver]
    resolvers[graphqlOperation][resolver] = (root, args) => {
      // Add more middlewares here
      argumentsMiddleware(`[${resolver}]: request called with args: `, args)
      return currentResolver(root, args)
    }
  })
})

exports.resolvers = resolvers
