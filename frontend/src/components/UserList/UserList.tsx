import React from 'react';
import { useSelector } from 'react-redux';
import styles from './UserList.module.scss';
import UserCard from '../UserCard/UserCard';
import useSubscribeToAppSync from '../../hooks/useSubscribeToAppSync';
import useGetUsers from '../../hooks/useGetUsers';
import { RootState } from '../../store';
import { UserListState } from '../../store/userList/types';

const UserList: React.FC = () => {
  useSubscribeToAppSync();
  useGetUsers();

  const usersState: UserListState = useSelector<RootState, UserListState>((s) => s.usersRoot);

  // TODO: Replace those elements below with prettier ones
  // TODO: Better strategy for handling loading states. Checking if data is undefined is not good enough due to
  // error that might occur. Check the useGetUsers for more details
  // if (usersState) {
  //   return <p>Loading...</p>;
  // }

  if (usersState.users.length === 0) {
    return <p>No users</p>;
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
