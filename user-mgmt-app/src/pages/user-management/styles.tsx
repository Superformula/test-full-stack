import styled from '@emotion/styled';
import { color } from 'styled-system';

export const RootDiv = styled.div`
  position: absolute;
  width: 1800px;
  height: 1600px;
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
  margin: 0 236px 64px 236px;
  ${color}
`;

export const UserListLabel = styled.div`
  width: 336px;
  height: 28px;

  font-family: Source Sans Pro, sans-serif;
  font-style: normal;
  font-weight: 300;
  font-size: 48px;
  line-height: 60px;
`;

export const SearchLabel = styled.label<{ visbile: boolean }>`
  font-family: Source Sans Pro, sans-serif;
  font-style: normal;
  font-weight: 600;
  font-size: 18px;
  line-height: 23px;
  margin-left: 5px;
  display: ${(props) => (props.visbile ? 'block' : 'none')};
`;

export const SearchInput = styled.input`
  width: 400px;
  height: 64px;
  background: #ffffff;
  border: 1px solid rgba(0, 0, 0, 0.1);
  border-radius: 8px;

  font-family: Source Sans Pro, sans-serif;
  font-style: normal;
  font-weight: 300;
  font-size: 24px;
  line-height: 30px;

  padding-left: 10px;

  color: rgba(0, 0, 0, 0.4);
`;

export const SearchInputContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-content: flex-start;
  justify-content: flex-start;
`;

export const SearchBarContainer = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: space-between;
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
