/* eslint-disable */
import * as Types from '../../@types/types';

import gql from 'graphql-tag';

export type GeocodeResultFragment = { __typename?: 'GeocodeResult' } & Pick<
  Types.GeocodeResult,
  'latitude' | 'longitude' | 'error'
>;

export const GeocodeResultFragmentDoc = gql`
  fragment GeocodeResult on GeocodeResult {
    latitude
    longitude
    error
  }
`;
