import React from 'react';
import classnames from 'classnames';
import './Button.scss';

type ColorEnum = 'primary' | 'secondary';

export interface ButtonProps {
  color: ColorEnum
  text: string
  onClick?: () => void
  disabled?: boolean
}

export const Button: React.FC<ButtonProps> = ({
  color, disabled, text, onClick,
}) => (
  <button type="button" disabled={disabled} className={classnames({ button: true, primary: color === 'primary', secondary: color === 'secondary' })} onClick={onClick} tabIndex={0}>{text}</button>
);
