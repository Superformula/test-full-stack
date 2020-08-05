import styled from '@emotion/styled';
import { color, space } from 'styled-system';
import { color as colorToken } from '../../theme/token';

export const StyledButton = styled('button')(
  {
    backgroundColor: colorToken.primary,
    color: colorToken.text,

    position: 'relative',
    width: '280px',
    height: '90px',

    border: '4px solid rgba(0, 0, 0, 0.1)',
    boxSizing: 'border-box',
    borderRadius: '8px',
    ':hover': { border: '4px solid rgba(0, 0, 0, 0.4);' },
    ':focus': { border: '4px solid rgba(0, 0, 0, 0.5);' },
    ':disabled': {
      color: colorToken.disabled,
      border: ' 4px solid rgba(0, 0, 0, 0.1);',
    },
  },
  color,
  space
);

export const ButtonText = styled.div`
  width: 100%;
  text-align: center;
  font-family: Source Sans Pro, sans-serif;
  font-style: normal;
  font-weight: 600;
  font-size: 24px;
  line-height: 30px;
`;
