import { gql } from '@apollo/client';

const GET_GEOCODING = gql`
    query Geocoding($address: String!) {
        geocoding(address: $address){
            address
            coordinates
        }
    }
`;

export default GET_GEOCODING;
