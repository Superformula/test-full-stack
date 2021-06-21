import { gql } from '@apollo/client';

export const GET_GEOCODING = gql`
    query Geocoding($address: String!) {
        geocoding(address: $address){
            address
            coordinates
        }
    }
`;
