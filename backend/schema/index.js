const { gql } = require('apollo-server-lambda');

// TODO: Map all underscore properties from MapBox into camel case for consistency
const typeDefs = gql`
    type Geometry {
        coordinates: [Float]
        type: String
    }
    
    type GeoContext {
        id: String
        short_code: String
        text: String
        wikidata: String
    }
    
    type GeoLocationInfo {
        bbox: [Float]
        center: [Float]
        context: [GeoContext]
        geometry: Geometry
        id: String
        place_name: String
        place_type: [String]
        relevance: Int
        text: String
        type: String
    }
    
    type GetUserResponse {
        data: [User!]
        lastKey: String
    }
  
    type User {
        id: String!
        name: String!
        dob: String!
        address: String!
        description: String!
        createdAt: String
        updatedAt: String
    }

    type Query {
        getUsers(
            name: String, 
            limit: Int, 
            lastKey: String
        ): GetUserResponse

        getUserLocation(id: String): [GeoLocationInfo]
    }
  
    type Mutation {
        createUser(
            name: String!
            dob: String!
            address: String!
            description: String!
        ): String!
        
        updateUser(
            id: String!
            name: String!
            description: String!
            address: String!
        ): Boolean!
        
        deleteUser(id: String!): Boolean!
    }
`;

exports.schema = typeDefs;
