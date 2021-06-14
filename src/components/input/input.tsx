import classNames from 'classnames';
import { ChangeEventHandler, memo } from 'react';

import classes from './Input.module.scss';

interface InputProps {
  placeholder?: string;
  className?: string;
  label?: string;
  name: string;
  value?: string;
  onChange?: ChangeEventHandler;
}

function InputComponent(props: InputProps) {
  const inputId = `input_${props.name}`;
  return (
    <div className={classNames(classes.input, props.className)}>
      {props.label && <label htmlFor={inputId}>{props.label}</label>}
      <input
        type='text'
        id={inputId}
        value={props.value}
        placeholder={props.placeholder}
        onChange={props.onChange}
      />
    </div>
  );
}

export const Input = memo(InputComponent);
