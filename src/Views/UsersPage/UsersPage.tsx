import React, { useCallback } from 'react';
import { debounce } from 'lodash';
import { Typography } from '../../components/typograph/Typography';
import useUserInfiniteList from '../../hooks/useUsersInifniteList';
import UserList from './UserList/UserList';
import { Button } from '../../components/button/Button';
import './UsersPage.scss';
import UserSearch from './UserSearch/UserSearch';
import useUserSearch from '../../hooks/useUserSearch';

const Users: React.FC = () => {
  const {
    users, loading, error, hasNextPage, loadMore,
  } = useUserInfiniteList();

  const { search, users: userSearch } = useUserSearch();

  const searchUser = debounce((inputText: string) => {
    search(inputText);
  }, 300);

  const onUserSearchHandler = useCallback((inputText) => {
    searchUser(inputText);
  }, [searchUser]);

  if (error) return <p>Error :(</p>;

  const usersArr = userSearch?.length ? userSearch : users;

  return (
    <div className="users-page">
      <div className="users-page-header">
        <Typography variant="h1">Users List</Typography>
        <UserSearch onChange={onUserSearchHandler} />
      </div>

      { loading ? (<span>loading...</span>) : (
        <>
          <UserList users={usersArr} />

          <div className="users-page-footer">
            <Button
              disabled={!hasNextPage || !!userSearch?.length}
              onClick={loadMore}
              text="load more"
              color="primary"
            />
          </div>
        </>
      )}

    </div>
  );
};

export default Users;
