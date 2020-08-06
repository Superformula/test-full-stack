import styled from '@emotion/styled';

export const InputLabel = styled.label<{ visbile: boolean }>`
  font-family: Source Sans Pro, sans-serif;
  font-style: normal;
  font-weight: 600;
  font-size: 18px;
  line-height: 23px;
  margin-left: 5px;
  display: ${(props) => (props.visbile ? 'block' : 'none')};
`;

export const StyledInput = styled.input<{
  width?: string;
  height?: string;
}>`
  width: ${(props) => props.width || '400px'};
  height: ${(props) => props.height || '64px'};
  background: #ffffff;
  border: 1px solid rgba(0, 0, 0, 0.1);
  border-radius: 8px;

  font-family: Source Sans Pro, sans-serif;
  font-style: normal;
  font-weight: 300;
  font-size: 24px;
  line-height: 30px;

  padding-left: 10px;

  color: #000000;

  ':placeholder' {
    color: rgba(0, 0, 0, 0.4);
  }
`;

export const InputContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-content: flex-start;
  justify-content: flex-start;
`;
