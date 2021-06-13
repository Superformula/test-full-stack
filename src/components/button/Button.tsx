import { memo, MouseEventHandler } from 'react';
import { ChildrenProps } from '../General';
import classnames from 'classnames';

import classes from './Button.module.scss';

interface ButtonProps extends ChildrenProps {
  secondary?: boolean;
  disabled?: boolean;
  onClick?: MouseEventHandler;
}

function ButtonComponent(props: ButtonProps) {
  return (
    <button
      className={classnames(classes.element, {
        [classes.secondary]: props.secondary,
      })}
      disabled={props.disabled}
      onClick={props.onClick}
    >
      {props.children}
    </button>
  );
}

export const Button = memo(ButtonComponent);
