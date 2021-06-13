import { ChangeEventHandler, memo } from 'react';
import classes from './Input.module.scss';

interface InputProps {
  placeholder?: string;
  label?: string;
  name: string;
  onChange?: ChangeEventHandler;
}

function InputComponent(props: InputProps) {
  const inputId = `input_${props.name}`;
  return (
    <div className={classes.element}>
      {props.label && <label htmlFor={inputId}>{props.label}</label>}
      <input
        type="text"
        id={inputId}
        placeholder={props.placeholder}
        onChange={props.onChange}
      />
    </div>
  );
}

export const Input = memo(InputComponent);
