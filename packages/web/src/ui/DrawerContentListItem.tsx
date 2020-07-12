import React, { memo, useCallback, useContext } from 'react';
import ListItem from '@material-ui/core/ListItem';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import ListItemText from '@material-ui/core/ListItemText';
import makeStyles from '@material-ui/core/styles/makeStyles';
import Tooltip from '@material-ui/core/Tooltip';

import { IMenu } from './Drawer';
import { DrawerContext } from './DrawerContext';

interface IProps {
  data: IMenu;
  onClick: (menu: IMenu) => void;
}

const useStyle = makeStyles((theme) => ({
  icon: {
    // padding: 0,
    margin: 0,
    minWidth: 34,
    marginRight: 15,
    fill: theme.palette.primary.contrastText,
  },
  text: {
    color: 'inherit',
  },
}));

const DrawerContentListItem = (props: IProps) => {
  const classes = useStyle(props);
  const context = useContext(DrawerContext);

  const handleClick = useCallback(() => props.onClick(props.data), [props]);

  return (
    <ListItem button disableGutters onClick={handleClick}>
      {!!props.data.icon && (
        <Tooltip
          title={props.data.display}
          placement="right"
          arrow
          disableHoverListener={context.isTemporary || context.isFull}
        >
          <ListItemIcon className={classes.icon} classes={{ root: classes.text }}>
            <props.data.icon />
          </ListItemIcon>
        </Tooltip>
      )}
      <ListItemText primary={props.data.display} classes={{ primary: classes.text }} />
    </ListItem>
  );
};

export default memo(DrawerContentListItem);
