import React from 'react';
import classnames from 'classnames';
import styles from './Button.module.scss';

type Props = {
  children?: React.ReactNode;
  variant?: 'primary' | 'secondary';
  onClick?: () => void;
};

const Button: React.FC<
  Props & React.ButtonHTMLAttributes<HTMLButtonElement>
> = ({ children, type = 'button', variant = 'primary', onClick }) => (
  <button
    type={type}
    className={classnames(styles.button, styles[`button--${variant}`])}
    onClick={onClick}
  >
    {children}
  </button>
);

export default Button;
