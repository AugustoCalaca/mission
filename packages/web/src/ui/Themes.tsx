import createMuiTheme from '@material-ui/core/styles/createMuiTheme';
import { ComponentsProps } from '@material-ui/core/styles/props';

import { ThemesTypes } from './ThemeContext';
import overrides from './ThemeOverrides';
import variables from './ThemeVariables';

const props: ComponentsProps = {
  MuiTextField: {
    variant: 'filled',
    margin: 'normal',
  },
};

const themes: { [key in ThemesTypes]: ReturnType<typeof createMuiTheme> } = {
  light: createMuiTheme(
    {
      palette: {
        type: 'light',
        primary: {
          light: '#64b5f6',
          main: '#2196f3',
          dark: '#1976d2',
          contrastText: '#fff',
        },
        secondary: {
          light: '#ffff53',
          main: '#ffcc09',
          dark: '#c79c00',
          contrastText: '#fff',
        },
      },
      overrides,
      props,
    },
    {
      variables,
    },
  ),
  dark: createMuiTheme(
    {
      palette: {
        type: 'dark',
        primary: {
          light: '#ffff53',
          main: '#ffcc09',
          dark: '#c79c00',
          contrastText: '#fff',
        },
        secondary: {
          light: '#ffff53',
          main: '#ffcc09',
          dark: '#c79c00',
          contrastText: '#fff',
        },
      },
      overrides,
      props,
    },
    {
      variables,
    },
  ),
};

export default themes;
