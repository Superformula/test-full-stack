import React from 'react';
import styles from './secondary-button.module.css';

interface Props {
  label: String,
  disabled?: boolean,
  onClick?: () => void,
}

function SecondaryButton({ label, disabled, onClick } : Props) {
  return (
    <button className={styles.button} onClick={onClick}>
      <p>{label}</p>
    </button>
  );
}

export default SecondaryButton;
