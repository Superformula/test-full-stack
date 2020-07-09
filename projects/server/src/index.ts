import { ApolloServer } from 'apollo-server-lambda';
import type { APIGatewayEvent, Context, Callback } from 'aws-lambda'
import { schema } from './schema';
import { resolvers } from './resolvers';

const server = new ApolloServer({ 
    typeDefs: schema, 
    resolvers: resolvers
});

export const graphqlHandler = function(event: APIGatewayEvent, context: Context, callback: Callback) : void {
    console.log(JSON.stringify(event));

    const handler = server.createHandler();

    return handler(event, context, callback);
}
