import React from 'react';
import { Typography } from '../../components/typograph/Typography';
import useUserInfiniteList from '../../hooks/useUsersInifniteList';
import UserList from './UserList/UserList';
import { Button } from '../../components/button/Button';
import './UsersPage.scss';
import { Input } from '../../components/input/Input';

const Users: React.FC = () => {
  const {
    users, loading, error, hasNextPage, loadMore,
  } = useUserInfiniteList();

  if (error) return <p>Error :(</p>;

  return (
    <div className="users-page">
      <div className="users-page-header">
        <Typography variant="h1">Users List</Typography>
        <Input placeholder="search" />
      </div>

      { loading ? (<span>loading...</span>) : (
        <>
          <UserList users={users} />

          <div className="users-page-footer">
            <Button
              disabled={!hasNextPage}
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
