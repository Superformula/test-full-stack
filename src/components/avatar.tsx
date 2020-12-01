import React from 'react';
import styles from './avatar.module.css';

interface Props {
  imgURL: string,
  alt: string,
}

function Avatar({ imgURL, alt } : Props) {
  return (
    <img className={styles.avatar} src={imgURL} alt={alt} />
  );
}

export default Avatar;
