import {
  InputContainer,
  InputLabel,
  StyledInput,
} from 'components/input/styles';
import React from 'react';
import { Optional } from 'types';

export interface InputProps {
  name: string;
  value: Optional<string>;
  label: string;
  placeholder: string;
  onChange: (newValue: string) => void;
  height?: string;
  width?: string;
}

const InputComponent: React.FC<InputProps> = ({
  name,
  value,
  label,
  placeholder,
  onChange,
  width,
  height,
}) => {
  return (
    <InputContainer>
      <InputLabel htmlFor={name} visbile={!!value}>
        {label}
      </InputLabel>
      <StyledInput
        width={width}
        height={height}
        id={name}
        name={name}
        value={value ?? undefined}
        placeholder={placeholder}
        onChange={(e) => onChange(e.target.value)}
      />
    </InputContainer>
  );
};

export const Input = InputComponent;
