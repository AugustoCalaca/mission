import IconButton from '@material-ui/core/IconButton';
import WbSunnyIcon from '@material-ui/icons/WbSunny';
import NightsStayIcon from '@material-ui/icons/NightsStay';
import { makeStyles } from '@material-ui/core/styles';

import React, { memo, useContext } from 'react';

import ThemeContext from './ThemeContext';

const useStyles = makeStyles(() => ({
  button: {
    padding: 5,
  },
}));

const Menu = (props: {}) => {
  const classes = useStyles(props);
  const themeContext = useContext(ThemeContext);

  return (
    <IconButton color="inherit" className={classes.button} onClick={themeContext.toogleTheme}>
      {themeContext.currentTheme === 'light' ? <WbSunnyIcon fontSize="large" /> : <NightsStayIcon fontSize="large" />}
    </IconButton>
  );
};

export default memo(Menu);
