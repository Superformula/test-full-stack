const { ApolloServer } = require('apollo-server-lambda');
const { schema: typeDefs } = require('./schema');
const { resolvers } = require('./resolvers')

const server = new ApolloServer({ typeDefs, resolvers });

exports.graphqlHandler = server.createHandler({
    cors: {
        origin: '*',
    },
});
