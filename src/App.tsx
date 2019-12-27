import React from 'react';
import { CssBaseline, MuiThemeProvider, createMuiTheme, Theme } from '@material-ui/core';
import CalcButton from './Helpers/CalcButton';
import Routes from './Routes';

const theme = createMuiTheme({
  palette: {
    primary: {
      main: '#b0f8ff',
    }
  }
});

const App: React.FC = () => {
  return (
    <MuiThemeProvider
      theme={theme}
      >
      <CssBaseline /> 
      <div className="App">
        <Routes />
      </div>
    </MuiThemeProvider>
  );
}

export default App;
