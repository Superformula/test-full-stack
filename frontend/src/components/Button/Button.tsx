import React from 'react';
import classNames from 'classnames';
import styles from './Button.module.scss';

type ButtonProps = {
  type: 'primary' | 'secondary';
  text: string;
  onClick: (event?: React.MouseEvent<HTMLButtonElement, MouseEvent>) => unknown;
  domType?: 'button' | 'submit' | 'reset';
};
const Button: React.FC<ButtonProps> = ({ onClick, text, domType, type }) => {
  const classes = classNames({
    [styles.button]: true,
    [styles.primary]: type === 'primary',
    [styles.secondary]: type === 'secondary',
  });

  return (
    // eslint-disable-next-line react/button-has-type
    <button className={classes} type={domType} onClick={onClick}>
      {text}
    </button>
  );
};

export default React.memo(Button);
