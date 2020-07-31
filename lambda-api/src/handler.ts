import "reflect-metadata";
import { ApolloServer } from "apollo-server-lambda";
import { buildSchemaSync } from "type-graphql";
import { Container } from "typedi";
import { UserResolver } from "./graphql";
import { GeocodingResolver } from "./graphql/geocoding-resolver";

const schema = buildSchemaSync({
  resolvers: [UserResolver, GeocodingResolver],
  // All Date with default to isoDate scalar
  dateScalarMode: "isoDate",
  emitSchemaFile: false,
  // TypeDI container
  container: Container,
});

const server = new ApolloServer({
  schema,
  playground: true,
  introspection: true,
  context: ({ event, context }) => ({
    headers: event.headers,
    functionName: context.functionName,
    event,
    context,
  }),
});

/**
 * Export the apollo-server-lambda handler for incoming GQL requests
 */
export const gqlRequestHandler = server.createHandler({
  cors: {
    origin: true,
    credentials: true,
  },
});
