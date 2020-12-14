import { useApolloClient } from '@apollo/client';
import { useEffect, useMemo, useState } from 'react';
import { useDispatch } from 'react-redux';
import { SearchUserResponseData, USER_SEARCH_LIST_GQL } from '../api/queries';
import { QuerySearchUsersArgs } from '../api/types';
import { updateList } from '../store/userList/actions';

const useGetUsers = (): boolean => {
  const apolloClient = useApolloClient();
  const dispatch = useDispatch();

  const [isLoading, setIsLoading] = useState(false);

  // TODO: Include search term and pagination here
  // variables: { name: "search term" }
  useEffect(() => {
    setIsLoading(true);

    apolloClient
      .query<SearchUserResponseData, QuerySearchUsersArgs>({
        fetchPolicy: 'no-cache',
        query: USER_SEARCH_LIST_GQL,
        variables: {},
      })
      .then((r) => {
        // TODO: Set exposed has more state in a memoized object
        // TODO: Keep track of pagination in my queries
        if (r.errors) {
          console.error('GraphQL endpoint returned errors', r);
          return;
        }

        if (!r.data) return;
        dispatch(updateList(r.data.searchUsers.items));
      })
      .catch((e) => {
        console.error(e);
      })
      .finally(() => {
        setIsLoading(false);
      });
  }, [dispatch, apolloClient]);

  return useMemo(() => isLoading, [isLoading]);
};

export default useGetUsers;
