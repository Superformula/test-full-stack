import {
  ErrorContent,
  ModalContent,
  StyledPrimaryButton,
} from 'components/error-dialog/styles';
import { Modal } from 'components/modal';
import React, { useState } from 'react';
import { SizeProps } from 'styled-system';
import { Optional } from 'types';

export interface ErrorDialogProps {
  errorMessage?: Optional<string>;
  onDimiss?: () => void;
}

const ErrorDialogComponent: React.FC<ErrorDialogProps & SizeProps> = ({
  errorMessage,
  onDimiss,
}) => {
  const [visible, setVisible] = useState(true);

  const handleDismiss = () => {
    setVisible(false);
    if (onDimiss) {
      onDimiss();
    }
  };

  return (
    <Modal visible={visible} width="600px" height="500px">
      <ModalContent>
        <ErrorContent background={'#FFFFFF'}>{errorMessage}</ErrorContent>
        <StyledPrimaryButton onClick={handleDismiss}>
          Dismiss
        </StyledPrimaryButton>
      </ModalContent>
    </Modal>
  );
};

export const ErrorDialog = ErrorDialogComponent;
