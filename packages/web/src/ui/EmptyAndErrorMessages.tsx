import React, { Fragment, memo } from 'react';
import TableCell from '@material-ui/core/TableCell';
import TableRow from '@material-ui/core/TableRow';
import ErrorIcon from '@material-ui/icons/ErrorOutline';

import ErrorMessage from './ErrorMessage';
import IconMessage from './IconMessage';

interface IProps {
  colSpan: number;
  error?: any;
  loading?: boolean;
  hasData: boolean;
  onTryAgain: () => void;
}

const EmptyAndErrorMessages = (props: IProps) => {
  const { error, hasData, loading, colSpan, onTryAgain } = props;

  return (
    <Fragment>
      {loading && !hasData && (
        <TableRow>
          <TableCell className="empty" colSpan={colSpan}>
            Loading...
          </TableCell>
        </TableRow>
      )}
      {error && !loading && (
        <TableRow>
          <TableCell colSpan={colSpan} className="error">
            <ErrorMessage error={error} tryAgain={onTryAgain} />
          </TableCell>
        </TableRow>
      )}
      {!error && !hasData && !loading && (
        <TableRow>
          <TableCell colSpan={colSpan}>
            <IconMessage message="No items found...">
              <ErrorIcon fontSize="large" />
            </IconMessage>
          </TableCell>
        </TableRow>
      )}
    </Fragment>
  );
};

export default memo(EmptyAndErrorMessages);
