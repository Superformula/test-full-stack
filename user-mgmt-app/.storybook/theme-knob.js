import React from 'react';
import { select } from '@storybook/addon-knobs';
import { ThemeProvider } from 'emotion-theming';
import * as themes from '../src/theme';
import { Global } from '@emotion/core';

export const ThemeKnob = ({ children }) => {
  const theme = select('Theme', Object.keys(themes), 'DefaultTheme');

  return (
    <>
      <Global styles={themes[theme].globalStyles} />
      <ThemeProvider theme={themes[theme]}> {children} </ThemeProvider>
    </>
  );
};
