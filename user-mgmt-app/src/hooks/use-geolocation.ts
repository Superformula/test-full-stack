import { useApolloClient } from '@apollo/client';
import { toErrorStr } from 'graphql/apollo-util';
import { GeocodeDocument } from 'graphql/user-api/queries/generated/userapi-queries';
import { Optional } from 'types';

export type UseGeocodeResult = {
  latitude?: Optional<number>;
  longitude?: Optional<number>;
  error?: Optional<string>;
};

export type UseGeolocation = {
  geocodeAddress: (address: string) => Promise<UseGeocodeResult>;
};

export const useGeolocation = (): UseGeolocation => {
  const apolloClient = useApolloClient();

  const geocodeAddress = async (address: string): Promise<UseGeocodeResult> => {
    try {
      // Execute the query synchronously
      const { data, error: queryError } = await apolloClient.query({
        query: GeocodeDocument,
        variables: {
          geocodeInput: { address },
        },
        fetchPolicy: 'network-only',
      });

      if (queryError) {
        console.error(
          `Error geocoding address ${address} ${toErrorStr(queryError)}`
        );
        return {
          error: `Error geocoding address ${address}`,
        };
      }

      return {
        ...data.geocode,
      };
    } catch (e) {
      console.error(`Error geocoding address ${address} ${toErrorStr(e)}`);
      return {
        error: `Error geocoding address ${address}`,
      };
    }
  };

  return {
    geocodeAddress,
  };
};
