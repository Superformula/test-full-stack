import { useApolloClient } from '@apollo/client';
import { toErrorStr } from 'graphql/apollo-util';
import { User } from 'graphql/user-api/@types';
import { UsersDocument } from 'graphql/user-api/queries/generated/userapi-queries';
import { useEffect, useState } from 'react';
import { Optional } from 'types';

type UseUserData = {
  /**
   * The user data as state
   */
  users: User[];
  /**
   * The current page number
   */
  pageNumber: number;
  /**
   * The current filter
   */
  nameFilter: Optional<string>;
  /**
   * Loading state
   */
  loading: boolean;
  /**
   * Error state
   */
  error: Optional<string>;
  /** Is more data available?  i.e. should a next page operation be permitted?
   *
   */
  isMoreData: boolean;
  /**
   *  Initialize the state using an optional search criteria
   *
   * @param userFilter Optional user filter value
   * @param pageNumber Optional page number to advance to after the reset
   */
  initialize: (
    userFilter?: Optional<string>,
    pageNumber?: Optional<number>
  ) => Promise<void>;
  /**
   * Load the next page of data
   */
  loadNextPage: () => Promise<void>;
  /**
   * Update the filter in place
   */
  updateFilter: (userNameFragment: string) => Promise<void>;
};

interface CursorState {
  currentPageNumber: number;
  cursor?: string;
  nameFilter?: Optional<string>;
  isMoreData: boolean;
}

/**
 *  Hook to create a pending reservation
 */
export const useUserData = (pageSize = 10): UseUserData => {
  const apolloClient = useApolloClient();

  // Manage currently rendered users via state
  const [users, setUsers] = useState<User[]>([]);
  const [cursorState, setCursorState] = useState<CursorState>({
    currentPageNumber: 0,
    isMoreData: true,
  });
  // Loading state
  const [loading, setLoading] = useState(false);
  // Error state
  const [error, setError] = useState<string | undefined>();
  // Number of pages to load async
  const [pagesToLoad, setPagesToLoad] = useState(0);

  const logAndGenerateErrorString = (
    curNameFilter: string | null | undefined,
    curCursor: string | undefined,
    curPageSize: number,
    curError: Error | undefined
  ): string => {
    const errorMsg = 'Error encountered while fetching user data';
    // eslint-disable-next-line no-console
    console.error(
      `${errorMsg} for search criteria
        ${curNameFilter}, cursor: ${curCursor} and limit ${curPageSize}: ${
        curError ? toErrorStr(curError) : ''
      }`
    );
    return errorMsg;
  };

  /**
   * Load a page of user data and update state
   */
  const loadNextPage = async (): Promise<void> => {
    const searchCriteria =
      (cursorState.nameFilter && { nameFilter: cursorState.nameFilter }) ||
      null;

    setLoading(true);
    try {
      // Execute the query synchronously
      const { data, error: queryError } = await apolloClient.query({
        query: UsersDocument,
        variables: {
          searchCriteria,
          pageRequest: {
            cursor: cursorState.cursor,
            limit: pageSize,
          },
        },
        fetchPolicy: 'network-only',
      });

      if (error) {
        setError(
          logAndGenerateErrorString(
            cursorState.nameFilter,
            cursorState.cursor,
            pageSize,
            queryError
          )
        );
      }

      // Update the state with the new data
      const { values: userArr, cursor: curCursor, isLastPage } = data.users;
      setUsers(users.concat(userArr));
      setCursorState({
        ...cursorState,
        currentPageNumber: cursorState.currentPageNumber + 1,
        cursor: curCursor,
        isMoreData: !isLastPage,
      });
    } catch (e) {
      setError(
        logAndGenerateErrorString(
          cursorState.nameFilter,
          cursorState.cursor,
          pageSize,
          e
        )
      );
    } finally {
      setLoading(false);
    }
  };

  /**
   * Reset the state
   *
   * @param userFilter An optional user filter value
   * @param pageNumber an optional page number to advance to
   */
  const initialize = async (
    userFilter?: Optional<string>,
    pageNumber?: Optional<number>
  ): Promise<void> => {
    setUsers([]);
    setCursorState({
      nameFilter: userFilter,
      currentPageNumber: 0,
      isMoreData: true,
    });

    // Init pages to load to kick off async page loading :/
    setPagesToLoad(pageNumber || 1);
  };

  /**
   * Perform initial load of data to restore state from URI params
   */
  useEffect(() => {
    const loadFn = async () => {
      await loadNextPage();
    };
    if (cursorState.isMoreData && pagesToLoad > 0) {
      loadFn().then(() => {
        setPagesToLoad(pagesToLoad - 1);
        // eslint-disable-next-line no-console
        console.info(`Page ${pagesToLoad} loaded`);
      });
    } else {
      // eslint-disable-next-line no-console
      console.info(`Page ${pagesToLoad} loaded - no more data to load`);
      setPagesToLoad(0);
    }
  }, [pagesToLoad, cursorState.isMoreData]);

  /**
   * Update to a new filter value
   *
   * @param userNameFragment The new user name filter value
   */
  const updateFilter = async (userNameFragment: string): Promise<void> => {
    // If the new filter is an extension of the last filter value, just filter the list that we already have in memory.
    // Pagination wil still work since the next page fetch will use an absolute offset via cursor value
    if (
      !cursorState.nameFilter ||
      (cursorState.nameFilter &&
        userNameFragment.startsWith(cursorState.nameFilter))
    ) {
      // Update the filter in state
      setCursorState({
        ...cursorState,
        nameFilter: userNameFragment,
      });
      // Filter the current user list state by the new filter
      const filteredUsers = users.filter((user) => {
        return user.name.includes(userNameFragment);
      });
      // Upate state with the filtered list
      setUsers(filteredUsers);
    } else {
      // If the new filter isn't an extension of the last filter value, reset state and re-query
      await initialize(userNameFragment);
    }
  };

  return {
    users,
    pageNumber: cursorState.currentPageNumber,
    nameFilter: cursorState.nameFilter,
    isMoreData: cursorState.isMoreData,
    loading,
    error,
    initialize,
    loadNextPage,
    updateFilter,
  };
};
