import { ButtonText, StyledButton } from 'components/button/styles';
import React from 'react';

export interface ButtonProps {
  onClick: () => void;
  disabled?: boolean;
}

export const PrimaryButton: React.FC<ButtonProps> = ({
  onClick,
  disabled,
  children,
}) => {
  return (
    <StyledButton onClick={onClick} disabled={disabled}>
      <ButtonText>{children}</ButtonText>
    </StyledButton>
  );
};
