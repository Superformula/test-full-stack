import React from 'react';
import styles from './UserCard.module.scss';

type UserCardProps = {
  imageSrc: string;
  name: string;
  description: string;
};

const UserCard: React.FC<UserCardProps> = ({ imageSrc, name, description }) => (
  <div className={styles.card}>
    <img src={imageSrc} className={styles.userImage} alt="User avatar" />
    <h2 className={styles.name}>{name.toUpperCase()}</h2>
    <p>{description}</p>
  </div>
);

export default React.memo(UserCard);
