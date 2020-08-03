import { Global } from '@emotion/core';
import { ThemeProvider } from 'emotion-theming';
import React from 'react';
import { HashRouter } from 'react-router-dom';
import { withApolloClient } from 'containers/withApolloClient';
import { withErrorBoundary } from 'containers/withErrorBoundary';
import Routes from './routes';
import { DefaultTheme } from './theme';

function App() {
  return (
    <>
      <Global styles={DefaultTheme.globalStyles} />
      <ThemeProvider theme={DefaultTheme}>
        <HashRouter hashType="slash">
          <Routes />
        </HashRouter>
      </ThemeProvider>
    </>
  );
}

export default withErrorBoundary(withApolloClient(App));
