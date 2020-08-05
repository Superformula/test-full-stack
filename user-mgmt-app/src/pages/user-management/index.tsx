import { PrimaryButton } from 'components/button';
import { ErrorDialog } from 'components/error-dialog';
import { UserList } from 'components/user-list';
import { useDebounce } from 'hooks/use-debounce';
import { useUserData } from 'hooks/use-user-data';
import {
  RootDiv,
  SearchInput,
  UserListLabel,
  UserListLayout,
  SearchBarContainer,
  LoadMoreContainer,
  SearchInputContainer,
  SearchLabel,
} from 'pages/user-management/styles';
import React, { useEffect, useState } from 'react';
import { RouteComponentProps, withRouter } from 'react-router-dom';
import { RouteParams } from 'routes';
import { color } from 'theme/token';
import { Optional } from 'types';

export interface UserManagementPageProps {
  nameFilter?: Optional<string>;
  currentPage?: Optional<number>;
}

const UserManagementPage: React.FC<
  UserManagementPageProps & RouteComponentProps
> = ({ nameFilter, currentPage, history, location }) => {
  const { userData, loadNextPage, initialize, updateFilter } = useUserData(6);
  const [showError, setShowError] = useState(false);
  const [filterValue, setFilterValue] = useState<Optional<string>>();

  // Debounce the filter value for type ahead
  const debouncedFilterValue = useDebounce<Optional<string>>(filterValue, 500);

  /**
   * Initialize once on load
   */
  useEffect(() => {
    const initFn = async () => {
      await initialize(nameFilter, currentPage);
      setFilterValue(nameFilter);
    };
    // eslint-disable-next-line no-console
    initFn().then(() => console.log('Initialized'));
    // eslint-disable-next-line
  }, []);

  /**
   * Keep the URI up to date when filter or page number is updated
   */
  useEffect(() => {
    const { pageNumber: hookPageNumber, nameFilter: hookNameFilter } = userData;
    const newLocation = `${location.pathname}?${
      RouteParams.currentPage
    }=${hookPageNumber}${
      hookNameFilter ? `&${RouteParams.nameFilter}=${hookNameFilter}` : ''
    }`;
    history.replace(newLocation);
    // eslint-disable-next-line
  }, [userData.pageNumber, userData.nameFilter]);

  const users = !userData.loading && !userData.error && userData.users;
  const { error, isMoreData } = userData;

  useEffect(() => {
    if (error && showError) {
      setShowError(true);
    }
  }, [error, showError]);

  /**
   * When the user input is debounced, update the name filter on the user data hook
   */
  useEffect(() => {
    updateFilter(debouncedFilterValue);
    // eslint-disable-next-line
  }, [debouncedFilterValue]);

  return (
    <RootDiv bg={color.background}>
      <UserListLayout bg={color.background}>
        {users && (
          <>
            <SearchBarContainer>
              <UserListLabel>Users list</UserListLabel>
              <form>
                <SearchInputContainer>
                  <SearchLabel htmlFor="searchinput" visbile={!!filterValue}>
                    Search
                  </SearchLabel>
                  <SearchInput
                    id="searchinput"
                    name="searchinput"
                    value={filterValue ?? undefined}
                    placeholder="Search..."
                    onChange={(e) => setFilterValue(e.target.value)}
                  />
                </SearchInputContainer>
              </form>
            </SearchBarContainer>
            <UserList users={users} />
          </>
        )}
        {!showError && isMoreData && (
          <LoadMoreContainer>
            <PrimaryButton onClick={loadNextPage}>Load more</PrimaryButton>
          </LoadMoreContainer>
        )}
        {showError && (
          <ErrorDialog
            errorMessage={error}
            onDimiss={() => setShowError(false)}
          />
        )}
      </UserListLayout>
    </RootDiv>
  );
};

export default withRouter(UserManagementPage);
