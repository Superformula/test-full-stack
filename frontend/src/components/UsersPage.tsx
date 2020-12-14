import React from 'react';
import UserList from './UserList/UserList';
import styles from './UsersPage.module.scss';

const UsersPage: React.FC = () => {
  console.log('stop collapsing me');

  return (
    <>
      <div className={styles.header}>
        <h1>Ola</h1>
        <input />
      </div>

      <UserList />
    </>
  );
};
export default UsersPage;
