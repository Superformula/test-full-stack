import { useLazyQuery } from '@apollo/client';
import { UsersSearch } from '../types';
import GET_USER_BY_NAME from '../GraphQL/queries/GetUserByName';

interface UsersInterface {
  usersByName: UsersSearch,
}

const useUserInfiniteList = () => {
  const [searchUser, {
    data, error, loading,
  }] = useLazyQuery<UsersInterface>(GET_USER_BY_NAME, { fetchPolicy: 'network-only' });

  const search = (name: string) => searchUser({
    variables: {
      first: 3,
      name,
    },
  });

  if (loading && !data?.usersByName) {
    return {
      loading, error, users: [], search,
    };
  }

  return {
    users: data?.usersByName?.edges?.map(({ node }) => node),
    hasNextPage: data?.usersByName?.pageInfo?.hasNextPage,
    loading,
    error,
    search,
  };
};

export default useUserInfiniteList;
