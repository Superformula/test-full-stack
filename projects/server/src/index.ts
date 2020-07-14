import { ApolloServer } from 'apollo-server-lambda';
import { createServer, proxy } from "aws-serverless-express";
import { schema } from './schema';
import { resolvers } from './resolvers';
import geocode from './geocode';

import type { APIGatewayEvent, Context, Callback } from 'aws-lambda';

const server = new ApolloServer({ 
    typeDefs: schema, 
    resolvers: resolvers
});

const graphql = server.createHandler({
    cors: {
        origin: '*'
    }
});

const geocoder = createServer(geocode);

export const lambda = function(event: APIGatewayEvent, context: Context, callback: Callback) : void {
    console.log(JSON.stringify(event));

    // We have to manually handle CORS. TODO: Clean this up. Parameterize CORS.
    // https://docs.aws.amazon.com/apigateway/latest/developerguide/how-to-cors.html

    // TODO: This is not scalable.
    if (event.path.indexOf('/graphql') >= 0) {
        return graphql(event, context, callback);
    }
    // REST endpoint.
    else {
        proxy(geocoder, event, context);
        return;
    }
}
