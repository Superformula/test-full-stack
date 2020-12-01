import React, { ReactNode } from 'react';
import styles from './card.module.css';

interface Props {
  children?: ReactNode,
}

function Card({ children } : Props) {
  return (
    <div className={styles.card}>
     {children}
    </div>
  );
}

export default Card;
