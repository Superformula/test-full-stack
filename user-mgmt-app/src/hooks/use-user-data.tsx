import { useApolloClient } from '@apollo/client';
import { toErrorStr } from 'graphql/apollo-util';
import { User } from 'graphql/user-api/@types';
import { UsersDocument } from 'graphql/user-api/queries/generated/userapi-queries';
import { useCallback, useEffect, useState } from 'react';
import { Optional } from 'types';

export interface UserData {
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
  /**
   * Is more data available?  i.e. should a next page operation be permitted?
   */
  isMoreData: boolean;
}

type UseUserData = {
  userData: UserData;
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
  updateFilter: (userNameFragment: Optional<string>) => Promise<void>;
  /**
   * Update a single user in the user cache
   */
  updateUserData: (user: User) => void;
};

interface CursorState {
  currentPageNumber: number;
  cursor?: string;
  nameFilter?: Optional<string>;
  isMoreData: boolean;
}

/**
 *  Hook to manage filtering/infinite scroll of {@link User} data
 */
export const useUserData = (pageSize = 10): UseUserData => {
  const apolloClient = useApolloClient();

  // Currently rendered users
  const [users, setUsers] = useState<User[]>([]);
  // Current cursor state
  const [cursorState, setCursorState] = useState<CursorState>({
    currentPageNumber: 0,
    isMoreData: true,
  });
  // Loading state
  const [loading, setLoading] = useState(false);
  // Error state
  const [error, setError] = useState<string | undefined>();
  // Number of pages to load async on initialization
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
   * Initialize the infinite scroll with an optional filter and page number
   *
   * @param userFilter An optional user filter value
   * @param pageNumber an optional page number to advance to during initialization
   */
  const initialize = async (
    userFilter?: Optional<string>,
    pageNumber?: Optional<number>
  ): Promise<void> => {
    setError(undefined);
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
   * initialize populates pagesToLoad  state and this effect will count down and load the specified number of pages
   * of data from the server.
   */
  useEffect(() => {
    const loadFn = async () => {
      await loadNextPage();
    };
    // Anything to do?
    if (pagesToLoad > 0) {
      if (cursorState.isMoreData) {
        loadFn().then(() => {
          // Update state with the decremented page count
          setPagesToLoad(pagesToLoad - 1);
          // eslint-disable-next-line no-console
          console.info(`Page ${pagesToLoad} loaded`);
        });
      } else {
        // eslint-disable-next-line no-console
        console.info(`Page ${pagesToLoad} loaded - no more data to load`);
        setPagesToLoad(0);
      }
    }
    // eslint-disable-next-line
  }, [pagesToLoad, cursorState.isMoreData]);

  /**
   * Update to a new filter value.  This function will first attempt to filter loaded data and if no data is found,
   * make a page load call.
   *
   * @param userNameFragment The new user name filter value
   */
  const updateFilter = useCallback(
    async (userNameFragment: Optional<string>): Promise<void> => {
      if (userNameFragment) {
        // If the new filter is an extension of the last filter value, just filter the list that we already have in
        // memory Pagination wil still work since the next page fetch will use an absolute offset via cursor value
        if (
          cursorState.nameFilter &&
          userNameFragment.startsWith(cursorState.nameFilter)
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

          // If there is data available after filtering, we're done.  Set state and get on with life.  If no data,
          // fall through to initialize so we try to fetch the first filtered page.
          if (filteredUsers.length > 0) {
            // Upate state with the filtered list
            setUsers(filteredUsers);
            return;
          }
        }
      }

      // If the new filter isn't an extension of the last filter value, reset state and re-query
      await initialize(userNameFragment);
    },
    [cursorState, users]
  );

  /**
   * Update a single user in the user cache
   */
  const updateUserData = (user: User) => {
    const updatedUsers =
      users &&
      users.map((oldUser) => {
        // If the id matches, spread the new user data on the old user data otherwise return the old user
        return oldUser.id === user.id
          ? {
              ...oldUser,
              ...user,
            }
          : { ...oldUser };
      });
    setUsers(updatedUsers);
  };

  return {
    userData: {
      users,
      pageNumber: cursorState.currentPageNumber,
      nameFilter: cursorState.nameFilter,
      isMoreData: cursorState.isMoreData,
      loading: loading || pagesToLoad > 0,
      error,
    },
    initialize,
    loadNextPage,
    updateFilter,
    updateUserData,
  };
};
