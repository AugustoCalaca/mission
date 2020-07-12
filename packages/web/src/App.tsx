import './assets/global.css';

import React, { memo, useState, useMemo } from 'react';
import CssBaseline from '@material-ui/core/CssBaseline';
import { MuiThemeProvider } from '@material-ui/core/styles';
import { hot } from 'react-hot-loader';

import { Alert, Toast, Themes, ThemeContext, IThemeContext, ThemesTypes } from './ui';
// import { Alert, Toast, Themes, ThemeContext, IThemeContext, ThemesTypes } from '@mission/ui';

import Pages from './Pages';

const App = () => {
  const [currentTheme, setCurrentTheme] = useState<ThemesTypes>(
    (localStorage.getItem('app-theme') ?? 'dark') as ThemesTypes,
  );

  const themeContext = useMemo<IThemeContext>(
    () => ({
      currentTheme,
      toogleTheme: () => {
        const newTheme: ThemesTypes = currentTheme === 'light' ? 'dark' : 'light';
        localStorage.setItem('app-theme', newTheme);
        setCurrentTheme(newTheme);
      },
    }),
    [currentTheme],
  );

  return (
    <ThemeContext.Provider value={themeContext}>
      <MuiThemeProvider theme={Themes[themeContext.currentTheme]}>
        <CssBaseline />

        <Alert.type.Global />
        <Toast.type.Global />

        <Pages />
      </MuiThemeProvider>
    </ThemeContext.Provider>
  );
};

export default hot(module)(memo(App));
