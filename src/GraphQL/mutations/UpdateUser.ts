import { gql } from '@apollo/client';

const UPDATE_USER = gql`
    mutation UpdateUser(
        $id: String!
        $name: String!
        $address: String!
        $description: String!
    ) {
        updateUser(input: {
            id: $id
            name: $name
            address: $address
            description: $description
        }){
            id
            name
            address
            description
        }
    }
`;

export default UPDATE_USER;
