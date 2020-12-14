import React, { useState } from 'react';
import UserList from './UserList/UserList';
import styles from './UsersPage.module.scss';
import SearchBar from './SearchBar/SearchBar';
import Button from './Button/Button';
import useSubscribeToAppSync from '../hooks/useSubscribeToAppSync';
import useGetUsers from '../hooks/useGetUsers';
import Modal, { ModalControls } from './Modal/Modal';

const UsersPage: React.FC = () => {
  useSubscribeToAppSync();
  const [isLoading, hasMore, loadMore] = useGetUsers();

  const modalRef = React.useRef<ModalControls>();

  const openModal = () => {
    console.log(modalRef);
    if (modalRef.current && modalRef.current.openModal) {
      console.log('Opening modal!');
      modalRef.current.openModal();
    }
  };

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
        <p>
          Lorem ipsum dolor sit amet, consectetur adipiscing elit. Vestibulum volutpat odio et urna elementum cursus.
          Donec consectetur nisl metus. Nunc eu lectus sollicitudin eros rutrum lobortis vitae elementum sapien. Quisque
          sagittis magna gravida faucibus suscipit. Nam vitae velit nec elit placerat finibus ac vitae magna. Donec
          luctus nibh in bibendum elementum. Aenean id dui est. Nulla hendrerit nisl et est sollicitudin rutrum. Ut
          suscipit, sapien vitae feugiat sagittis, metus felis tincidunt ipsum, quis posuere dui erat pulvinar justo. Ut
          sed ultrices risus. Curabitur et lectus pharetra, sodales elit ac, sollicitudin lacus. Aenean neque leo,
          ultricies maximus mi vitae, ultrices ultricies lorem. Aenean blandit fringilla nunc in vestibulum. Mauris at
          massa tincidunt, ultricies nisi quis, pharetra est. Aenean convallis, nisi quis mattis vulputate, est erat
          dapibus tortor, rhoncus condimentum diam purus quis dui. Mauris semper, dolor ut fringilla tristique, ipsum
          sem pellentesque lectus, id varius diam orci sit amet neque. Vestibulum ut finibus nisi. Morbi eu mauris
          finibus, consectetur magna in, rutrum ipsum. In a libero diam. Curabitur vel placerat quam. Nam vitae dapibus
          dui. Suspendisse ac congue quam. Phasellus dolor metus, viverra ut est ac, consequat malesuada enim. Curabitur
          et quam in ipsum lacinia feugiat. Cras tempus dui vel mattis sodales. Donec imperdiet est non nisl vulputate
          accumsan. Pellentesque gravida fermentum est.
        </p>
      </Modal>
    </>
  );
};
export default UsersPage;
