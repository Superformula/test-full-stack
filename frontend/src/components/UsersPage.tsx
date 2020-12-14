import React, { useState } from 'react';
import UserList from './UserList/UserList';
import styles from './UsersPage.module.scss';
import SearchBar from './SearchBar/SearchBar';
import Button from './Button/Button';
import useSubscribeToAppSync from '../hooks/useSubscribeToAppSync';
import useGetUsers from '../hooks/useGetUsers';

const UsersPage: React.FC = () => {
  useSubscribeToAppSync();
  const [isLoading, hasMore, loadMore] = useGetUsers();

  return (
    <>
      <div className={styles.header}>
        <h1>User list</h1>
        <SearchBar />
      </div>

      <UserList isLoading={isLoading} />

      <div className={styles.footer}>
        {hasMore ? <Button type="primary" text="LOAD MORE" onClick={loadMore} /> : null}
        <Button type="secondary" text="Create User" onClick={() => console.log('Testing')} />
      </div>
    </>
  );
};
export default UsersPage;
