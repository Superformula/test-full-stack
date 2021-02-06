const { gql } = require('apollo-server-lambda');

const typeDefs = gql`
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
    }
`;

exports.schema = typeDefs;
