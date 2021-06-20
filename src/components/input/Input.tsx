import React, { FormEventHandler } from 'react';
import './Input.scss';

export interface InputProps {
  placeholder?: string
  label?: string
  name?: string
  onChange?: FormEventHandler
  onBlur?: () => void
  ref?: React.Ref<any>
}

// eslint-disable-next-line import/prefer-default-export
export const Input: React.FC<InputProps> = ({
  name,
  label,
  placeholder,
  onChange,
  onBlur,
  ref,
}) => (
  <div className="input-wrapper">
    <label htmlFor={name}>{label}</label>
    <input
      className="input-field"
      name={name}
      placeholder={placeholder}
      onChange={onChange}
      onBlur={onBlur}
      ref={ref}
    />
  </div>
);
