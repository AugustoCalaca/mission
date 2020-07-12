import React, { memo, useCallback, useMemo, useState } from 'react';
import IconButton from '@material-ui/core/IconButton';
import MoreHorizIcon from '@material-ui/icons/MoreHoriz';
import Menu, { MenuProps } from '@material-ui/core/Menu';

import DropDownMenuContext from './DropDownMenuContext';
import DropDownMenuOptionItem from './DropDownMenuOptionItem';

const DropDownMenu = (props: Partial<MenuProps>) => {
  const [targetElem, setTargetElem] = useState<HTMLElement>();

  const [options, content] = useMemo(() => {
    const options: React.ReactChild[] = [];
    const content: React.ReactChild[] = [];

    React.Children.toArray(props.children).forEach((child: any) => {
      if (child.type === DropDownMenuOptionItem) {
        options.push(child);
        return;
      }

      content.push(child);
    });

    return [options, content.length ? content : null];
  }, [props.children]);

  const handleOpen = useCallback((event: React.MouseEvent<HTMLElement>) => {
    event.preventDefault();
    event.stopPropagation();
    setTargetElem(event.currentTarget);
  }, []);

  const handleClose = useCallback((event?: React.MouseEvent<HTMLElement>) => {
    event && event.stopPropagation();
    setTargetElem(null);
  }, []);

  const handleClick = useCallback(
    (handler: () => void) => {
      handleClose();
      handler();
    },
    [handleClose],
  );

  return (
    <div>
      {!!content && <span onClick={handleOpen}>{content}</span>}

      {!content && (
        <IconButton onClick={handleOpen} color="inherit">
          <MoreHorizIcon />
        </IconButton>
      )}

      <Menu {...props} anchorEl={targetElem} open={!!targetElem} onClose={handleClose}>
        <DropDownMenuContext.Provider value={handleClick}>{options}</DropDownMenuContext.Provider>
      </Menu>
    </div>
  );
};

export default memo(DropDownMenu);
