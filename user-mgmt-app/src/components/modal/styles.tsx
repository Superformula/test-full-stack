import styled from '@emotion/styled';
import { boxShadowStyle } from 'components/sharedStyles';

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
`;

export const ModalDiv = styled.div<{
  height: string | undefined;
  width: string | undefined;
  color: string;
}>`
  z-index: 500;
  border-radius: 8px;
  height: ${(props) => props.height} important;
  width: ${(props) => props.width} important;
  box-sizing: border-box;
  transition: all 2s ease-in-out;
  background: ${(props) => props.color};
  ${boxShadowStyle}
`;
