import { useMutation } from '@apollo/client';
import { useCallback } from 'react';
import { Geocoding, UpdateUserInput } from '../types';
import UPDATE_USER from '../GraphQL/mutations/UpdateUser';

interface GeocodingInt {
  geocoding: Geocoding
}

const useUpdateUser = () => {
  const [updateUser, {
    data, error, loading,
  }] = useMutation<GeocodingInt>(UPDATE_USER);

  const update = useCallback((user: UpdateUserInput) => updateUser({
    variables: user,
  }), [updateUser]);

  if (loading && !data?.geocoding) {
    return {
      loading, error, update,
    };
  }

  return {
    loading,
    error,
    update,
  };
};

export default useUpdateUser;
