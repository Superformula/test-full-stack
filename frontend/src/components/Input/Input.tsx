import React from 'react';
import styles from './Input.module.scss';

type Props = {
  id: string;
  label?: string;
  placeholder?: string;
  value?: string;
  onChange?: (event: React.ChangeEvent<HTMLInputElement>) => void;
};

const Input: React.FC<Props> = ({
  id,
  label,
  placeholder,
  value,
  onChange = () => {
    /**/
  },
}) => (
  <div className={styles.wrapper}>
    {label && (
      <label htmlFor={id} className={styles.label}>
        {label}
      </label>
    )}
    <input
      id={id}
      className={styles.input}
      placeholder={placeholder}
      value={value || ''}
      onChange={onChange}
    />
  </div>
);

export default Input;
