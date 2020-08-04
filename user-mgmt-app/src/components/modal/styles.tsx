import styled from '@emotion/styled';
import { boxShadowStyle } from 'components/sharedStyles';

export const ModalDiv = styled.div`
  position: fixed;
  z-index: 500;
  border-radius: 8px;
  background-color: ${(props) => props.theme.colors.secondary};
  width: 1328px;
  height: 725px;
  box-sizing: border-box;
  transition: all 2s ease-in-out;
  ${boxShadowStyle}
`;
