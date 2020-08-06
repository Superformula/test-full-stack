import { PrimaryButton } from 'components/button';
import { EditUser } from 'components/edit-user';
import { ErrorDialog } from 'components/error-dialog';
import { Loading } from 'components/loading';
import { UserList } from 'components/user-list';
import { User } from 'graphql/user-api/@types';
import { useDebounce } from 'hooks/use-debounce';
import { useUserData } from 'hooks/use-user-data';
import {
  RootDiv,
  UserListLabel,
  UserListLayout,
  SearchBarContainer,
  LoadMoreContainer,
} from 'pages/user-management/styles';
import React, { useEffect, useState } from 'react';
import { RouteComponentProps, withRouter } from 'react-router-dom';
import { RouteParams } from 'routes';
import { color } from 'theme/token';
import { Optional } from 'types';
import { Input } from 'components/input';

export interface UserManagementPageProps {
  nameFilter?: Optional<string>;
  currentPage?: Optional<number>;
}

const UserManagementPage: React.FC<
  UserManagementPageProps & RouteComponentProps
> = ({ nameFilter, currentPage, history, location }) => {
  const {
    userData,
    loadNextPage,
    initialize,
    updateFilter,
    updateUserData,
  } = useUserData(6);
  const [showError, setShowError] = useState(false);
  const [filterValue, setFilterValue] = useState<Optional<string>>();
  const [userEditing, setUserEditing] = useState<Optional<User>>();

  // Debounce the filter value for type ahead
  const debouncedFilterValue = useDebounce<Optional<string>>(filterValue, 750);

  /**
   * Initialize once on load
   */
  useEffect(() => {
    const initFn = async () => {
      await initialize(nameFilter, currentPage);
      if (!loading) {
        setFilterValue(nameFilter);
      }
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
  const { error, isMoreData, loading } = userData;

  /**
   * Show an error dialog on errors
   */
  useEffect(() => {
    if (error && !showError) {
      setShowError(true);
    }
  }, [error, showError]);

  /**
   * When the user input is debounced, update the name filter on the user data hook
   */
  useEffect(() => {
    if (!loading) {
      updateFilter(debouncedFilterValue).then(() =>
        console.debug('Filter updated')
      );
    }
    // eslint-disable-next-line
  }, [debouncedFilterValue]);

  const editUser = (user: User) => {
    setUserEditing(user);
  };

  const finishEditUser = (user?: Optional<User>) => {
    // When editing is complete, update the cached User to keep UI state in sync
    if (user) {
      updateUserData(user);
    }
    setUserEditing(undefined);
  };

  return (
    <RootDiv bg={color.background}>
      <Loading message="Loading..." visible={loading} />

      {userEditing && (
        <EditUser
          user={userEditing!}
          visible={!!userEditing}
          onClose={finishEditUser}
        />
      )}

      {showError && (
        <ErrorDialog
          errorMessage={error}
          onDismiss={() => {
            setShowError(false);
            initialize(nameFilter, currentPage).then(() =>
              console.log('Reinitialized after loading error ack')
            );
          }}
        />
      )}

      <UserListLayout bg={color.background}>
        {users && (
          <>
            <SearchBarContainer>
              <UserListLabel>Users list</UserListLabel>
              <form>
                <Input
                  name="searchinput"
                  value={filterValue}
                  label="Search"
                  placeholder="Search..."
                  onChange={(newValue: Optional<string>) => {
                    if (newValue !== filterValue) {
                      setFilterValue(newValue);
                    }
                  }}
                />
              </form>
            </SearchBarContainer>
            <UserList users={users} onEdit={editUser} />
          </>
        )}
        {!showError && isMoreData && !loading && (
          <LoadMoreContainer>
            <PrimaryButton onClick={loadNextPage}>Load more</PrimaryButton>
          </LoadMoreContainer>
        )}
      </UserListLayout>
    </RootDiv>
  );
};

export default withRouter(UserManagementPage);
