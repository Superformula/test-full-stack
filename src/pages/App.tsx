/* eslint-disable react-hooks/exhaustive-deps */
import React, { useEffect, useState } from 'react';
import styles from './App.module.css';
import PrimaryButton from 'components/primary-button';
import EditUserModal from 'components/edit-user-modal';
import User, { UserEmpty } from 'models/user.model';
import UserCard from 'components/user-card';
import Amplify from 'aws-amplify';
import awsconfig from '../aws-exports.js';
import UsersService from 'services/users.service';

Amplify.configure(awsconfig);
const usersService = new UsersService();

function App() {
  const [searchString, setSearchString] = useState<string>("");
  const [nextToken, setNextToken ] = useState<string | null>(null);
  const [loadedAllUsers, setLoadedAllUsers ] = useState<boolean>(false);
  const [modalVisibility, setModalVisibility] = useState<boolean>(false);
  const [editingUser, setEditingUser ] = useState<User>(UserEmpty);
  const [users, setUsers] = useState<Array<User>>([]);
  const batchLength: number = 6;

  const openModal = (user: User) => {
    setEditingUser(user);
    setModalVisibility(true);
  }

  const closeModal = () => {
    setModalVisibility(false);
  }

  const loadUsers = async (token: string | null) => {
    if(!loadedAllUsers){
      const response = await usersService.getUsersList(batchLength, token)
      setUsers(users.concat(response.items))
  
      if(response.token) {
        setNextToken(response.token);
      } else {
        setLoadedAllUsers(true)
      }
    }
  }

  const handleLoadMoreUsers = () => {
    setSearchString("");
    loadUsers(nextToken);
  }

  useEffect(() => {
    loadUsers(null);
  }, [])

  
  const filteredUsers = users.filter(user => user.name.toLowerCase().includes(searchString.toLowerCase()));

  return (
    <div className="pageContent">
      <header className={styles.header}>
        <h1>Users list</h1>
        <input data-testid="searchBar" className={styles.searchBar} placeholder="Search..." value={searchString} onChange={e => setSearchString(e.target.value)}/>
      </header>
      <main data-testid="cardsGrid" className={styles.cardsGrid}>
        {
          filteredUsers.map((user, index) => 
            <UserCard 
              key={index}
              user={user}
              imgURL={`https://source.unsplash.com/128x128/?face,${index}`}
              onEdit={() => openModal(user)}
            />
          )
        }
      </main>
      <div className={styles.buttonContainer}>
        {
          loadedAllUsers 
            ? <p>Loaded all users</p>
            : <PrimaryButton data-testid="loadMoreBtn" label="Load More" onClick={handleLoadMoreUsers}/>
        }
      </div>
      {
        modalVisibility && <EditUserModal isOpen={modalVisibility} onClose={closeModal} user={editingUser} />
      }
    </div>
  );
}

export default App;
