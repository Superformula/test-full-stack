import { ModalDiv } from 'components/modal/styles';
import React from 'react';

export interface ModalProps {
  visible: boolean;
}

export const Modal: React.FC<ModalProps> = ({ visible, children }) => {
  return visible ? <ModalDiv>{children}</ModalDiv> : null;
};
