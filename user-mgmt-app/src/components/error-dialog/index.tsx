import {
  ErrorContent,
  ModalContent,
  StyledModal,
  StyledPrimaryButton,
} from 'components/error-dialog/styles';
import React, { useState } from 'react';
import { SizeProps } from 'styled-system';
import { Optional } from 'types';

export interface ErrorDialogProps {
  errorMessage?: Optional<string>;
  onDismiss?: () => void;
}

const ErrorDialogComponent: React.FC<ErrorDialogProps & SizeProps> = ({
  errorMessage,
  onDismiss,
}) => {
  const [visible, setVisible] = useState(true);

  const handleDismiss = () => {
    setVisible(false);
    if (onDismiss) {
      onDismiss();
    }
  };

  return (
    <StyledModal visible={visible} width="600px" height="500px">
      <ModalContent>
        <ErrorContent background={'#FFFFFF'}>{errorMessage}</ErrorContent>
        <StyledPrimaryButton onClick={handleDismiss}>
          Dismiss
        </StyledPrimaryButton>
      </ModalContent>
    </StyledModal>
  );
};

export const ErrorDialog = ErrorDialogComponent;
