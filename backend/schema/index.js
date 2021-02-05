const { gql } = require('apollo-server-lambda')

const typeDefs = gql`
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
        getUsers(limit: Int, offset: Int): [User!]
    }
`;

exports.schema = typeDefs
