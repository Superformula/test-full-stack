import { useApolloClient } from '@apollo/client';
import { useCallback, useEffect, useMemo, useState } from 'react';
import { useDispatch } from 'react-redux';
import { StringParam, useQueryParam, NumberParam } from 'use-query-params';
import { SearchUserResponseData, USER_SEARCH_LIST_GQL } from '../api/queries';
import { QuerySearchUsersArgs } from '../api/types';
import { updateList } from '../store/userList/actions';

type GetUsersHookData = [boolean, boolean, () => void];

const useGetUsers = (): GetUsersHookData => {
  const apolloClient = useApolloClient();
  const dispatch = useDispatch();

  const [isLoading, setIsLoading] = useState(false);
  const [hasMore, setHasMore] = useState(false);
  const [searchTerm] = useQueryParam('searchTerm', StringParam);
  const [page, setPage] = useQueryParam('page', NumberParam);

  // useCallback to load more
  const loadMore = useCallback(() => {
    setIsLoading(true);

    const queryVariables: QuerySearchUsersArgs = {};

    const trimmedQuery = searchTerm?.trim();
    if (trimmedQuery) queryVariables.name = trimmedQuery;

    const evaluatedPage = (page ?? 1) + 1; // We are evaluating the next page
    const multiplier = evaluatedPage - 1; // Pass the page to zero-index
    if (multiplier) queryVariables.skip = 6 * multiplier; // Obtain the amount of items to skip

    apolloClient
      .query<SearchUserResponseData, QuerySearchUsersArgs>({
        fetchPolicy: 'no-cache',
        query: USER_SEARCH_LIST_GQL,
        variables: queryVariables,
      })
      .then((r) => {
        if (r.errors) {
          console.error('GraphQL endpoint returned errors', r);
          return;
        }

        if (!r.data || !r.data.searchUsers) return;

        setHasMore(r.data.searchUsers.hasMore);
        dispatch(updateList(r.data.searchUsers.items));
        setPage(evaluatedPage);
      })
      .catch((e) => {
        console.error(e);
      })
      .finally(() => {
        setIsLoading(false);
      });
  }, [apolloClient, dispatch, page, setHasMore, setPage, searchTerm]);

  useEffect(() => {
    setIsLoading(true);

    const queryVariables: QuerySearchUsersArgs = {};
    const trimmedQuery = searchTerm?.trim();
    if (trimmedQuery) queryVariables.name = trimmedQuery;

    const evaluatedPage = page ?? 1;
    const multiplier = evaluatedPage - 1; // Pass the page to zero-index
    queryVariables.skip = 6 * multiplier; // Obtain the amount of items to skip

    apolloClient
      .query<SearchUserResponseData, QuerySearchUsersArgs>({
        fetchPolicy: 'no-cache',
        query: USER_SEARCH_LIST_GQL,
        variables: queryVariables,
      })
      .then((r) => {
        if (r.errors) {
          console.error('GraphQL endpoint returned errors', r);
          return;
        }

        if (!r.data || !r.data.searchUsers) return;

        setHasMore(r.data.searchUsers.hasMore);
        dispatch(updateList(r.data.searchUsers.items));
      })
      .catch((e) => {
        console.error(e);
      })
      .finally(() => {
        setIsLoading(false);
      });

    // Page refreshes shouldn't trigger a new query
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [dispatch, apolloClient, searchTerm]);

  return useMemo(() => [isLoading, hasMore, loadMore], [isLoading, hasMore, loadMore]);
};

export default useGetUsers;
