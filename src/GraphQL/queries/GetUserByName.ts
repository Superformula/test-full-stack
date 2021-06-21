import { gql } from '@apollo/client';

export const GET_USER_BY_NAME = gql`
    query GetUserByName($first: Int!, $name: String!) {
        usersByName(first: $first, name: $name) {
            edges{
                node{
                    id
                    name
                    address
                    description
                    createdAt
                    imageUrl
                }
                cursor
            }
            pageInfo{
                endCursor
                hasNextPage
            }
        }
    }
`;
