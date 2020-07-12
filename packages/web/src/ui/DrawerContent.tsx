import React, { memo, useCallback } from 'react';
import List from '@material-ui/core/List';
import makeStyles from '@material-ui/core/styles/makeStyles';

import { IMenu } from './Drawer';
import DrawerContentListItem from './DrawerContentListItem';

interface IProps {
  menu: IMenu[];
  navigate: (path: string) => void;
  close: () => void;
}

const useStyle = makeStyles((theme) => ({
  root: {
    background: theme.palette.grey['900'],
    color: theme.palette.primary.contrastText,
    height: '100vh',
  },
  header: {
    padding: '10px 0',
  },
  list: {
    padding: 0,
  },
  name: {
    fontFamily: 'Montserrat, sans-serif',
    fontWeight: 600,
    color: 'white',
    marginBottom: 15,
  },
}));

const Content = (props: IProps) => {
  const classes = useStyle(props);
  const navigate = useCallback((menu: IMenu) => props.navigate(menu.path), [props]);

  return (
    <div className={classes.root}>
      <div className={classes.header}></div>

      <List className={classes.list}>
        {props.menu.map((item) => (
          <DrawerContentListItem key={item.path} data={item} onClick={navigate} />
        ))}
      </List>
    </div>
  );
};

export default memo(Content);
