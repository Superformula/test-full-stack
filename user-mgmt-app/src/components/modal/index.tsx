import { ModalBackground, ModalDiv } from 'components/modal/styles';
import { withTheme } from 'emotion-theming';
import React from 'react';

export interface ModalProps {
  visible: boolean;
  children: React.ReactNode;
  height?: string;
  width?: string;
}

const ModalComponent: React.FC<ModalProps & { children: React.ReactNode }> = ({
  visible,
  height,
  width,
  children,
}) => {
  return visible ? (
    <ModalBackground>
      <ModalDiv height={height} width={width} color="#FFFFFF">
        {children}
      </ModalDiv>
    </ModalBackground>
  ) : null;
};

export const Modal = withTheme(ModalComponent);
