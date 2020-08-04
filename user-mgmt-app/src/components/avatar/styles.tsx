import styled from '@emotion/styled';
import { AvatarProps } from 'components/avatar/index';

export const AvatarDiv = styled.div<AvatarProps>`
  position: absolute;
  vertical-align: middle;
  width: 168px;
  height: 168px;
  border-radius: 50%;
  overflow: hidden;
  background-image: url(${(props) => props.imageUrl});
  background-repeat: no-repeat;
`;
