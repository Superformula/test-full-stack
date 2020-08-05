import styled from '@emotion/styled';
import { PrimaryButton } from 'components/button';
import { background } from 'styled-system';

export const ErrorContent = styled.div<{ background: string }>`
  min-height: 200px;
  min-width: 400px;
  margin: 25px 0 25px 0;
  padding: 10px;
  ${background};
`;

export const ModalContent = styled.div`
  width: 500px;
  margin: 0;
  display: flex;
  flex-direction: column;
  align-items: center;
  align-content: center;
  padding: 20px;
`;

export const StyledPrimaryButton = styled(PrimaryButton)`
  margin-bottom: 15px;
`;
