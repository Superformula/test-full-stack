import { useQuery } from '@apollo/client';
import { useCallback, useState } from 'react';
import { GET_USERS } from '../GraphQL/queries/GetUsersQuery';
import { UsersSearch } from '../types';

interface UsersInterface {
  users: UsersSearch,
}

const useUserInfiniteList = () => {
  const [loadingMore, setLoadingMore] = useState(false);
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

  const loadMore = useCallback(async () => {
    setLoadingMore(true);

    await fetchMore({
      variables: {
        after: endCursor,
      },
    });

    setLoadingMore(false);
  }, [endCursor, fetchMore]);

  const isLoadedAndEmpty = loading && !!edges?.length;

  const nodes = isLoadedAndEmpty ? [] : edges?.map(({ node }) => node);

  return {
    users: nodes,
    hasNextPage,
    loading,
    loadingMore,
    error,
    loadMore,
  };
};

export default useUserInfiniteList;
