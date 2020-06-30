// ### User Model

// ```
// {
//   "id": "xxx",                  // user ID (must be unique)
//   "name": "backend test",       // user name
//   "dob": "",                    // date of birth
//   "address": "",                // user address
//   "description": "",            // user description
//   "createdAt": ""               // user created date
//   "updatedAt": ""               // user updated date
// }
// ```


const defs = `

 type User {
    id: ID!
    name: String!
    dob: String!
    address: String!
    description: String!
    createdAt: String!
    updatedAt: String!
 }


 type Query {
     allUsers: [User!]!
 }
`
module.exports = defs
