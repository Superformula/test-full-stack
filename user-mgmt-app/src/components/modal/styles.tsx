import { keyframes } from '@emotion/core';
import styled from '@emotion/styled';
import { modalBoxShadowStyle } from 'components/sharedStyles';

const fadeInAnimation = keyframes`
  0%   { opacity: 0; }
  100% { opacity: 1; }
`;

const fadeOutAnimation = keyframes`
  0%   { opacity: 1; }
  100% { opacity: 0; }
`;

export const ModalBackground = styled.div`
  position: fixed;
  display: flex;
  flex-direction: column;
  align-items: center;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background: rgba(0, 0, 0, 0.3);

  transition-duration: 10s;
  transition-property: width;
`;

export const ModalDiv = styled.div<{
  height: string | undefined;
  width: string | undefined;
  color: string;
  visible: boolean;
  modalVisible: boolean;
}>`
  z-index: 500;
  border-radius: 8px;
  height: ${(props) => props.height} important;
  width: ${(props) => props.width} important;
  box-sizing: border-box;
  background: ${(props) => props.color};

  display: inline-block;
  visibility: ${(props) => (props.modalVisible ? 'visible' : 'hidden')};
  animation: ${(props) => (props.visible ? fadeInAnimation : fadeOutAnimation)}
    0.8s ease-in-out;

  ${modalBoxShadowStyle};
`;
