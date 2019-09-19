import React from 'react';
import Calculator from './Calculator';
import { CssBaseline, MuiThemeProvider, createMuiTheme, Theme } from '@material-ui/core';

const theme = createMuiTheme({
  palette: {
    primary: {
      main: '#b0f8ff',
    }
  }
})

const App: React.FC = () => {
  return (
    <MuiThemeProvider
      theme={theme}
      >
      <CssBaseline /> 
      <div className="App">
        <Calculator />
      </div>
    </MuiThemeProvider>
  );
}

export default App;
