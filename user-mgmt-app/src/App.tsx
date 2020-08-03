import { Global } from '@emotion/core';
import { ThemeProvider } from 'emotion-theming';
import React from 'react';
import logo from './logo.svg';
import './App.css';
import { DefaultTheme } from './theme';

function App() {
  return (
    <>
      <Global styles={DefaultTheme.globalStyles} />
      <ThemeProvider theme={DefaultTheme}>
        <div className="App">
          <header className="App-header">
            <img src={logo} className="App-logo" alt="logo" />
            <p>
              Edit
              {' '}
              <code>src/App.tsx</code>
              {' '}
              and save to reload.
            </p>
            <a
              className="App-link"
              href="https://reactjs.org"
              target="_blank"
              rel="noopener noreferrer"
            >
              Learn React
            </a>
          </header>
        </div>
      </ThemeProvider>
    </>
  );
}

export default App;
