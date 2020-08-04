import styled from '@emotion/styled';
import { Avatar } from 'components/avatar';
import { boxShadowStyle } from 'components/sharedStyles';

export const UserCardDiv = styled.div`
  position: relative;
  width: 400px;
  height: 336px;
  background: ${(props) => props.theme.colors.secondary};
  border-radius: 8px;
  :hover {
    ${boxShadowStyle};
  }
  :focus {
    ${boxShadowStyle};
  }
`;

export const StyledAvatar = styled(Avatar)`
  margin: 40px 116px 128px 116px;
`;

export const NameLabel = styled.span`
  position: absolute;
  display: flex;
  align-items: center;
  width: 336px;
  height: 28px;

  font-family: Source Sans Pro;
  font-style: normal;
  font-weight: 600;
  font-size: 21px;
  line-height: 26px;

  margin: 240px 32px 68px 32px;
`;

export const DescriptionLabel = styled.span`
  position: absolute;
  display: flex;
  align-items: center;
  width: 336px;
  height: 20px;

  font-family: Source Sans Pro;
  font-style: normal;
  font-weight: 300;
  font-size: 16px;
  line-height: 20px;

  margin: 276px 32px 40px 32px;
`;

export const EditIconContainer = styled.div`
  position: absolute;
  display: flex;
  align-items: flex-end;
  margin: 18px 18px 296px 355px;
`;
