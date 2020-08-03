import { useUserData } from 'hooks/use-user-data';
import React, { useEffect } from 'react';
import { RouteComponentProps, withRouter } from 'react-router-dom';
import { Optional } from 'types';

export interface UserManagementPageProps {
  nameFilter?: Optional<string>;
  currentPage?: Optional<number>;
}

const UserManagementPage: React.FC<
  UserManagementPageProps & RouteComponentProps
> = ({ nameFilter, currentPage, history, location }) => {
  const {
    users,
    pageNumber: hookPageNumber,
    nameFilter: hookNameFilter,
    loading,
    error,
    isMoreData,
    loadNextPage,
    initialize,
    updateFilter,
  } = useUserData(5);

  /**
   * Initialize once on load
   */
  useEffect(() => {
    const initFn = async () => {
      await initialize(nameFilter, currentPage);
    };
    // eslint-disable-next-line no-console
    initFn().then(() => console.log('Initialized'));
  }, []);

  /**
   * Keep the URI up to date when filter or page number is updated
   */
  useEffect(() => {
    const newLocation = `${location.pathname}?currentPage=${hookPageNumber}${
      hookNameFilter ? `&nameFilter=${hookNameFilter}` : ''
    }`;
    history.push(newLocation);
  }, [hookNameFilter, hookPageNumber]);

  return (
    <>
      {nameFilter}
      {currentPage}
      {!loading && !error && JSON.stringify(users)}
      {error && error}
      {isMoreData && (
        <>
          <button type="button" onClick={loadNextPage}>
            Load more
          </button>
          <button type="button" onClick={() => updateFilter('H')}>
            Filter on H
          </button>
        </>
      )}
    </>
  );
};

export default withRouter(UserManagementPage);
