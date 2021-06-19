import { useQuery } from '@apollo/client';
import GET_USERS from '../GraphQL/queries/GetUsersQuery';
import { UsersSearch } from '../types';

interface UsersInterface {
  users: UsersSearch,
}

const usePersons = () => {
  const {
    data, error, loading, fetchMore,
  } = useQuery<UsersInterface>(GET_USERS, {
    variables: {
      first: 1,
    },
  });

  if (loading && !data?.users) {
    return { loading, error, users: [] };
  }

  const loadMore = () => fetchMore({
    variables: {
      after: data?.users.pageInfo.endCursor,
    },
  });

  return {
    users: data?.users?.edges?.map(({ node }) => node),
    hasNextPage: data?.users?.pageInfo?.hasNextPage,
    loading,
    error,
    loadMore,
  };
};

export default usePersons;
