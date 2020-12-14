import React from 'react';
import { useSelector } from 'react-redux';
import styles from './UserList.module.scss';
import UserCard from '../UserCard/UserCard';
import useSubscribeToAppSync from '../../hooks/useSubscribeToAppSync';
import useGetUsers from '../../hooks/useGetUsers';
import { RootState } from '../../store';
import { UserListState } from '../../store/userList/types';

type UserListProps = {
  isLoading: boolean;
};

const UserList: React.FC<UserListProps> = ({ isLoading }) => {
  const usersState: UserListState = useSelector<RootState, UserListState>((s) => s.usersRoot);

  // TODO: Replace those elements below with prettier ones
  if (isLoading) {
    return (
      <div className={styles.container}>
        <p className={styles.loading}>Loading...</p>
      </div>
    );
  }

  if (usersState.users.length === 0) {
    return (
      <div className={styles.container}>
        <p>No users</p>
      </div>
    );
  }

  return (
    <div className={styles.grid}>
      {usersState.users.map((u) => (
        <UserCard key={u.id} imageSrc={u.avatar} name={u.name} description={u.description} />
      ))}
    </div>
  );
};

export default React.memo(UserList);
