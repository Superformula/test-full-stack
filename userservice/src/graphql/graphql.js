import { ApolloServer, gql } from "apollo-server-lambda";
import getUserService from "../compositeRoot/getUserService.js";
import getGeoLocationService from "../compositeRoot/getGeoLocationService.js";

const typeDefs = gql`
  type Query {
    getUserLocation(id: ID): LocationInfo
  }

  type LocationInfo {
    locationJsonString: String
  }
`;
const resolvers = {
  Query: {
    getUserLocation: async (parent, args, context, info) => {
      const userService = getUserService();
      let user = await userService.getUser({ id: args.id });
      if (user && user.address) {
        const mapService = getGeoLocationService();
        let result = await mapService.getLocationInfo(user.address);
        return { locationJsonString: result };
      } else {
        return null;
      }
    },
  },
};

const server = new ApolloServer({
  typeDefs,
  resolvers,
  introspection: true,
  playground: {
    endpoint: "/dev/graphql",
  },
});

exports.graphqlHandler = server.createHandler();
