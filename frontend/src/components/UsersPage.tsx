import React, { useState } from 'react';
import UserList from './UserList/UserList';
import styles from './UsersPage.module.scss';

const UsersPage: React.FC = () => {
  console.log('stop collapsing me');

  return (
    <>
      <div className={styles.header}>
        <h1>User list</h1>
        <input />
      </div>

      <UserList />

      <button type="button" onClick={() => console.log('I was clicked and will become a callback later')}>
        Button
      </button>
    </>
  );
};
export default UsersPage;
