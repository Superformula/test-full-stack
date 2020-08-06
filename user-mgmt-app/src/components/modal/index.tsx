import { ModalBackground, ModalDiv } from 'components/modal/styles';
import { withTheme } from 'emotion-theming';
import React, { useEffect, useState } from 'react';

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
  const [transitioning, setTransitioning] = useState(false);
  const [modalVisible, setModalVisible] = useState(visible);

  useEffect(() => {
    if (!transitioning && !visible) {
      setTransitioning(true);
      setTimeout(() => {
        setModalVisible(false);
      }, 400);
    } else if (transitioning && visible) {
      setTransitioning(false);
      setModalVisible(true);
    }
  }, [transitioning, visible]);

  return (
    <ModalBackground>
      <ModalDiv
        data-testid="Modal"
        height={height}
        width={width}
        color="#F8F8F8"
        visible={visible}
        modalVisible={modalVisible}
      >
        {children}
      </ModalDiv>
    </ModalBackground>
  );
};

export const Modal = withTheme(ModalComponent);
