import React, { useEffect } from 'react';
import { gql, useLazyQuery } from '@apollo/client';
import { QuerySearchUsersArgs, User, UserSearchResult } from '../../api/types';
import { SEARCH_USER_GQL, SearchUserResponseData } from '../../api/queries';
import styles from './UserList.module.scss';
import UserCard from '../UserCard/UserCard';

const UserList: React.FC = () => {
  const [searchUserLazy, { data }] = useLazyQuery<SearchUserResponseData, QuerySearchUsersArgs>(SEARCH_USER_GQL);

  useEffect(() => {
    searchUserLazy({ variables: { name: 'p' } });
  }, []);

  console.log('Users received!', data);

  // TODO: Replace those elements below with prettier ones
  if (!data || !data.searchUsers) {
    // TODO: Better strategy for handling loading states. Checking if data is undefined is not good enough due to
    // error that might occurr
    return <p>Loading...</p>;
  }

  if (!data.searchUsers.items || data.searchUsers.items.length === 0) {
    return <p>No users</p>;
  }

  return (
    <div className={styles.grid}>
      {data.searchUsers.items.map((u) => (
        <UserCard key={u.id} imageSrc={u.avatar} name={u.name} description={u.description} />
      ))}
    </div>
  );
  // return (
  //   <div>
  //     <div>UserList</div>
  //   </div>
  // );
};

export default React.memo(UserList);
