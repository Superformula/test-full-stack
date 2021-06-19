import { gql } from '@apollo/client';

const GET_USERS = gql`
    query GetUsers($first: Int!, $after: String) {
        users(first: $first, after: $after) {
            edges{
                node{
                    id
                    name
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

export default GET_USERS;
