import React, { useCallback, useState } from 'react';
import { useQuery, useMutation } from '@apollo/client';
import { debounce } from 'lodash';

import { User } from '../../types';
import Card from '../Card/Card';
import Button from '../Button/Button';
import Input from '../Input/Input';
import styles from './App.module.scss';
import UserModal from '../UserModal/UserModal';
import { GET_USERS, UPDATE_USER } from './gqlQueries';

type UsersResponse = {
  searchUsers: {
    users: User[];
    nextToken: string;
  };
};

const SEARCH_DEBOUNCE_TIME = 500;

const App: React.FC = () => {
  const [selectedUser, setSelectedUser] = useState<User>();
  const [searchText, setSearchsText] = useState('');
  const [search, setSearch] = useState('');
  const { data, loading, error, fetchMore, refetch } = useQuery<UsersResponse>(
    GET_USERS,
    {
      variables: {
        search,
        nextToken: '',
      },
    },
  );
  const [updateUser] = useMutation(UPDATE_USER, {
    onCompleted() {
      handleUserSelection(undefined);
    },
  });
  const setSearchHandler = useCallback(
    debounce((newSearch: string) => {
      setSearch(newSearch);
      refetch();
    }, SEARCH_DEBOUNCE_TIME),
    [],
  );
  const handleUserSelection = (user?: User) => {
    setSelectedUser(user);
    document.body.style.overflow = user ? 'hidden' : '';
  };

  if (loading) return <p>Loading...</p>;
  if (error || !data) return <p>Error</p>;

  const { users, nextToken } = data.searchUsers;

  return (
    <div className={styles.content}>
      <header className={styles.header}>
        <h1 className={styles.title}>Users list</h1>
        <div className={styles.search}>
          <Input
            id="search"
            placeholder="Search..."
            value={searchText}
            onChange={(event: React.ChangeEvent<HTMLInputElement>) => {
              setSearchsText(event.target.value);
              setSearchHandler(event.target.value);
            }}
          />
        </div>
      </header>
      <div className={styles.list}>
        {users.map((user) => (
          <Card
            key={user.id}
            user={user}
            onClick={() => handleUserSelection(user)}
          />
        ))}
      </div>
      {nextToken && (
        <div className={styles.loadMoreWrapper}>
          <Button
            variant="primary"
            onClick={() => {
              fetchMore({
                variables: {
                  search,
                  nextToken,
                },
              });
            }}
          >
            Load More
          </Button>
        </div>
      )}
      <UserModal
        user={selectedUser}
        onClose={() => handleUserSelection(undefined)}
        onSave={(userInModal) =>
          updateUser({
            variables: {
              id: userInModal.id,
              n: userInModal.name || '',
              a: userInModal.address || '',
              d: userInModal.description || '',
            },
          })
        }
      />
    </div>
  );
};

export default App;
