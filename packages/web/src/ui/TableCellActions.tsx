import React, { memo, Props } from 'react';
import CircularProgress from '@material-ui/core/CircularProgress';
import makeStyles from '@material-ui/core/styles/makeStyles';
import { SvgIconComponent } from '@material-ui/icons';
import TableCell from '@material-ui/core/TableCell';

import DropDownMenu from './DropDownMenu';
import DropDownMenuOptionItem from './DropDownMenuOptionItem';

import ErrorMessageIcon from './ErrorMessageIcon';

export interface IDropDownOption {
  text: string;
  icon?: SvgIconComponent;
  handler: () => void;
}

interface IProps extends Props<null> {
  options?: IDropDownOption[];
  loading?: boolean;
  error?: any;
  onDismissError?: () => void;
}

const useStyle = makeStyles({
  td: {
    textAlign: 'right',
    width: 50,
    whiteSpace: 'nowrap',
    padding: 0,
  },
  loader: {
    padding: 12,
  },
});

const TableCellActions = (props: IProps) => {
  const classes = useStyle(props);
  const { loading, error, options, onDismissError, children } = props;

  return (
    <TableCell className={classes.td}>
      {children}

      {loading && (
        <div className={classes.loader}>
          <CircularProgress color="primary" size={20} />
        </div>
      )}
      {!loading && error && <ErrorMessageIcon error={error} onDismiss={onDismissError} />}
      {!loading && !error && options && (
        <DropDownMenu>
          {options.map((option) => (
            <DropDownMenuOptionItem key={option.text} {...option} />
          ))}
        </DropDownMenu>
      )}
    </TableCell>
  );
};

export default memo(TableCellActions);
