import React, { useCallback, useState } from 'react';
import UserList from './UserList/UserList';
import styles from './UsersPage.module.scss';
import SearchBar from './SearchBar/SearchBar';
import Button from './Button/Button';
import useSubscribeToAppSync from '../hooks/useSubscribeToAppSync';
import useGetUsers from '../hooks/useGetUsers';
import Modal, { ModalControls } from './UserDetailsModal/Modal';
import UserDetailsModalContent from './UserDetailsModal/UserDetailsModalContent';
import Map from './UserDetailsModal/Map';

const UsersPage: React.FC = () => {
  useSubscribeToAppSync();
  const [isLoading, hasMore, loadMore] = useGetUsers();

  const modalRef = React.useRef<ModalControls>();

  const openModal = useCallback(() => {
    if (modalRef.current && modalRef.current.openModal) {
      modalRef.current.openModal();
    }
  }, [modalRef]);

  return (
    <>
      <div className={styles.header}>
        <h1>User list</h1>
        <SearchBar />
      </div>

      <UserList isLoading={isLoading} />

      <div className={styles.footer}>
        {hasMore ? <Button type="primary" text="LOAD MORE" onClick={loadMore} /> : null}
        <Button type="secondary" text="Create User" onClick={() => openModal()} />
      </div>

      <Modal ref={modalRef}>
        <h1>Modal Header</h1>
        <Map />
      </Modal>

      <Modal ref={modalRef}>
        <UserDetailsModalContent />
      </Modal>
    </>
  );
};
export default UsersPage;
