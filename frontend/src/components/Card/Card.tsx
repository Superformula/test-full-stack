import React from 'react';
import moment from 'moment';

import styles from './Card.module.scss';
import { User } from '../../types';

type Props = {
  user: User;
  onClick: () => void;
};

const parseDate = (date?: string) => moment(date).format('DD MMM YYYY');

const Card: React.FC<Props> = ({ user, onClick }) => (
  <div className={styles.wrapper} onClick={onClick}>
    <img
      className={styles.avatar}
      src={`https://source.unsplash.com/random/168x168?sig=${user.id}`}
    ></img>
    <div className={styles.middleInfo}>
      <div className={styles.name}>{user.name}</div>
      <div>
        {user.updatedAt ? (
          <>
            <span className={styles.dateText}>updated</span>
            <span className={styles.dateValue}>
              {parseDate(user.updatedAt)}
            </span>
          </>
        ) : (
          <>
            <span className={styles.dateText}>created</span>
            <span className={styles.dateValue}>
              {parseDate(user.createdAt)}
            </span>
          </>
        )}
      </div>
    </div>
    <div className={styles.description}>{user.description}</div>
  </div>
);

export default Card;
