import { useLazyQuery } from '@apollo/client';
import { useCallback } from 'react';
import { GET_GEOCODING } from '../GraphQL/queries/Geocoding';
import { Geocoding } from '../types';

interface GeocodingInt {
  geocoding: Geocoding
}

const useGeocoding = () => {
  const [getGeocoding, {
    data, error, loading,
  }] = useLazyQuery<GeocodingInt>(GET_GEOCODING);

  const search = useCallback((address: string) => getGeocoding({
    variables: {
      address,
    },
  }), [getGeocoding]);

  if (loading && !data?.geocoding) {
    return {
      loading, error, coordinates: [], search,
    };
  }

  return {
    coordinates: data?.geocoding?.coordinates,
    loading,
    error,
    search,
  };
};

export default useGeocoding;
