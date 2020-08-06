import styled from '@emotion/styled';
import { Modal } from 'components/modal';
import { modalBoxShadowStyle } from 'components/sharedStyles';

export const LoadingContainer = styled.div`
  width: 100%;
  height: 100%;
  padding: 30px;
  background: #fafafa;
  position: relative;
`;

export const LoadingContent = styled.div`
  width: 125px;
  height: 35px;
  margin: 0;
  display: flex;
  flex-direction: column;
  align-items: center;
  align-content: center;
  padding: 15px;
  background: #f8f8f8;
  border-radius: 8px;

  font-family: Source Sans Pro, sans-serif;
  font-style: normal;
  font-weight: 300;
  font-size: 16px;
  line-height: 30px;

  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);

  ${modalBoxShadowStyle};
`;

export const StyledModal = styled(Modal)`
  z-index: 100000;
  div {
    z-index: 100000;
  }
`;
