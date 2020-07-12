import React, { memo, SyntheticEvent, useCallback, useContext } from 'react';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import ListItemText from '@material-ui/core/ListItemText';
import { SvgIconComponent } from '@material-ui/icons';
import MenuItem from '@material-ui/core/MenuItem';
import makeStyles from '@material-ui/core/styles/makeStyles';

import DropdownMenuContext from './DropDownMenuContext';

export type IDropDownOption = {
  text: string;
  icon?: SvgIconComponent;
  handler: () => void;
};

const useStyle = makeStyles({
  text: {
    paddingLeft: '0 !important',
  },
});

const DropDownMenuOptionItem = (props: IDropDownOption) => {
  const context = useContext(DropdownMenuContext);
  const classes = useStyle(props);

  const onClick = useCallback(
    (event: SyntheticEvent) => {
      event.preventDefault();
      event.stopPropagation();
      context(props.handler);
    },
    [context, props.handler],
  );

  return (
    <MenuItem onClick={onClick}>
      {!!props.icon && (
        <ListItemIcon>
          <props.icon />
        </ListItemIcon>
      )}
      <ListItemText inset={!!props.icon} primary={props.text} className={props.icon ? classes.text : undefined} />
    </MenuItem>
  );
};

export default memo(DropDownMenuOptionItem);
