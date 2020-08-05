import styled from '@emotion/styled';
import { Avatar } from 'components/avatar';
import { boxShadowStyle } from 'components/sharedStyles';
import { color } from 'styled-system';

export const UserCardDiv = styled.div`
  position: relative;
  width: 400px;
  height: 336px;
  border-radius: 8px;
  :hover {
    ${boxShadowStyle};
  }
  :focus {
    ${boxShadowStyle};
  }
  ${color}
`;

export const StyledAvatar = styled(Avatar)`
  top: 40px;
  left: 116px;
`;

export const NameLabel = styled.span`
  position: absolute;
  width: 336px;
  height: 28px;

  font-family: Source Sans Pro, sans-serif;
  font-style: normal;
  font-weight: 600;
  font-size: 21px;
  line-height: 26px;

  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;

  top: 240px;
  left: 32px;
`;

export const DescriptionLabel = styled.span`
  position: absolute;
  width: 336px;
  height: 20px;

  font-family: Source Sans Pro, sans-serif;
  font-style: normal;
  font-weight: 300;
  font-size: 16px;
  line-height: 20px;

  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;

  top: 272px;
  left: 32px;
`;

export const EditIconContainer = styled.div`
  position: absolute;
  display: flex;
  align-items: flex-end;

  top: 18px;
  right: 18px;

  :hover {
    cursor: pointer;
  }
`;
