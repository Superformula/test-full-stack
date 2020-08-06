import styled from '@emotion/styled';
import { color } from 'styled-system';

export const RootDiv = styled.div`
  position: absolute;
  width: 1800px;
  height: 1600px;
  min-height: 1600px;
  flex-direction: column;
  align-items: center;
  align-content: center;
  flex-grow: 0;
  flex-shrink: 0;
  /// padding: 193px 236px 64px 236px;
  ${color}
`;

export const UserListLayout = styled.div`
  position: absolute;
  margin: 193px 236px 64px 236px;
  ${color}
`;

export const UserListLabel = styled.div`
  width: 336px;
  height: 90px;

  font-family: Source Sans Pro, sans-serif;
  font-style: normal;
  font-weight: 300;
  font-size: 48px;
  line-height: 90px;
`;

export const SearchBarContainer = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
  align-content: center;
  margin-bottom: 64px;
  min-width: 1328px;
`;

export const LoadMoreContainer = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-content: center;
  align-items: center;
  margin-top: 64px;
`;
