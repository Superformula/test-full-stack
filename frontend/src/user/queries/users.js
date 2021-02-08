import {  gql } from '@apollo/client';

export const UPDATE_USER = gql`
    mutation UpdateUser($id: String!, $name: String!, $description: String!, $address: String!){
        updateUser(id: $id, name: $name, description: $description, address: $address)
    }
`;
