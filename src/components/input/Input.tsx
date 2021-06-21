import React, { FormEventHandler } from 'react';
import classnames from 'classnames';
import './Input.scss';

export interface InputProps {
  placeholder?: string
  label?: string
  value?: string
  name?: string
  onChange?: FormEventHandler
  className?: string
}

export const Input: React.FC<InputProps> = ({
  name,
  label,
  placeholder,
  onChange,
  value,
  className,
}) => (
  <div className={classnames('input-wrapper', className)}>
    <label htmlFor={name}>{label}</label>
    <input
      className="input-field"
      name={name}
      placeholder={placeholder}
      onChange={onChange}
      value={value}
      tabIndex={0}
    />
  </div>
);
