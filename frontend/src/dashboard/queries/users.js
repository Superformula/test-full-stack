import {  gql } from '@apollo/client';

export const GET_USERS = gql`
    query GetUsers($limit: Int!, $name: String!, $lastKey: String){
        getUsers(limit: $limit, name: $name, lastKey: $lastKey) {
            data {
                id
                name
                dob
                description
            }
            lastKey
        }
    }
`;
