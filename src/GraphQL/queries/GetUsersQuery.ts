import { gql } from '@apollo/client';

export const GET_USERS = gql`
    query GetUsers($first: Int!, $after: String) {
        users(first: $first, after: $after) {
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
