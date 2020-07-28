import { ApolloServer } from 'apollo-server-lambda';

import { typeDefs, resolvers, mocks }  from './graphql/schema';

const server = new ApolloServer({
  typeDefs,
  resolvers,
  mocks,
  mockEntireSchema: false,
  context: ({ event, context }) => ({
    headers: event.headers,
    functionName: context.functionName,
    event,
    context,
  }),
});

/**
 * Export the apollo-server-lambda handler for incoming requests
 */
exports.handler = server.createHandler({
  cors: {
    origin: true,
    credentials: true,
  },
});
