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

export const ButtonValues: Array<CalcButton> = [
  new CalcButton(0, '1', '1'),
  new CalcButton(0, '2', '2'),
  new CalcButton(0, '3', '3'),
  new CalcButton(0, '4', '4'),
  new CalcButton(0, '5', '5'),
  new CalcButton(0, '6', '6'),
  new CalcButton(0, '7', '7'),
  new CalcButton(0, '8', '8'),
  new CalcButton(0, '9', '9'),
  new CalcButton(0, '0', '0'),
  new CalcButton(2, '+', '+'),
  new CalcButton(2, '-', '-'),
  new CalcButton(2, 'x', 'x'),
  new CalcButton(2, '/', '/'),
  new CalcButton(2, '^', '^'),
  new CalcButton(3, '=', '='),
  new CalcButton(1, '!', '!'),
  new CalcButton(1, 'sin(x)', 'sin()'),
  new CalcButton(1, 'cos(x)', 'cos()'),
  new CalcButton(1, 'tan(x)', 'tan()'),
  new CalcButton(0, '.', '.'),
  new CalcButton(4, 'c', 'clear'),
  new CalcButton(0, 'π', `${Math.PI}`),
  new CalcButton(0, 'e', `${Math.E}`),
];

export const StringButtonValues: Array<string> = [
  '1',
  '2',
  '3',
  '4',
  '5',
  '6',
  '7',
  '8',
  '9',
  '0',
  '+',
  '-',
  'x',
  '/',
  '^',
  '=',
  '!',
  'sin(x)',
  'cos(x)',
  'tan(x)',
  '.',
  'c',
  'π',
  'e'
];

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
