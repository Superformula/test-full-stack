import React, { useState } from 'react';
import UserList from './UserList/UserList';
import styles from './UsersPage.module.scss';
import SearchBar from './SearchBar/SearchBar';

const UsersPage: React.FC = () => {
  console.log('stop collapsing me');

  return (
    <>
      <div className={styles.header}>
        <h1>User list</h1>
        <SearchBar />
      </div>

      <UserList />

      <button type="button" onClick={() => console.log('I was clicked and will become a callback later')}>
        Button
      </button>
    </>
  );
};
export default UsersPage;
