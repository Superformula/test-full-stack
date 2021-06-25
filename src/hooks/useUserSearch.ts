import { useLazyQuery } from '@apollo/client';
import { useCallback } from 'react';
import { UsersSearch } from '../types';
import { GET_USER_BY_NAME } from '../GraphQL/queries/GetUserByName';

const useUserInfiniteList = () => {
  const [searchUser, {
    data, error, loading,
  }] = useLazyQuery<UsersInterface>(GET_USER_BY_NAME, { fetchPolicy: 'network-only' });

  const search = useCallback((name: string) => searchUser({
    variables: {
      first: 10,
      name,
    },
  }), [searchUser]);

  const edges = data?.usersByName?.edges;
  const isLoadedAndEmpty = loading && !!edges?.length;
  const nodes = isLoadedAndEmpty ? [] : edges?.map(({ node }) => node);

  return {
    users: nodes,
    loading,
    error,
    search,
  };
};

interface UsersInterface {
  usersByName: UsersSearch,
}

export default useUserInfiniteList;
