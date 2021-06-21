import { useQuery } from '@apollo/client';
import { useCallback } from 'react';
import { GET_USERS } from '../GraphQL/queries/GetUsersQuery';
import { UsersSearch } from '../types';

interface UsersInterface {
  users: UsersSearch,
}

const useUserInfiniteList = () => {
  const {
    data, error, loading, fetchMore,
  } = useQuery<UsersInterface>(GET_USERS, {
    variables: {
      first: 3,
    },
  });

  const users = data?.users;
  const edges = users?.edges;
  const pageInfo = users?.pageInfo;
  const endCursor = pageInfo?.endCursor;
  const hasNextPage = pageInfo?.hasNextPage;

  const loadMore = useCallback(() => fetchMore({
    variables: {
      after: endCursor,
    },
  }), [endCursor, fetchMore]);

  const isLoadedAndEmpty = loading && !!edges?.length;

  const nodes = isLoadedAndEmpty ? [] : edges?.map(({ node }) => node);

  return {
    users: nodes,
    hasNextPage,
    loading,
    error,
    loadMore,
  };
};

export default useUserInfiniteList;
