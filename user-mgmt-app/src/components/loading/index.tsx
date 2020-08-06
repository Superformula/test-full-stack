import {
  LoadingContainer,
  LoadingContent,
  StyledModal,
} from 'components/loading/styles';
import React from 'react';

interface LoadingProps {
  message: string;
  visible: boolean;
  children?: React.ReactNode;
}

const LoadingComponent: React.FC<LoadingProps> = ({
  message,
  visible,
  children,
}) => {
  return (
    <>
      {visible && (
        <LoadingContainer>
          <StyledModal width="600px" height="500px" visible={visible}>
            <LoadingContent>{message}</LoadingContent>
            {children}
          </StyledModal>
        </LoadingContainer>
      )}
    </>
  );
};

export const Loading = LoadingComponent;
