import React, { memo, useCallback } from 'react';
import IconButton from '@material-ui/core/IconButton';
import ErrorOutlineIcon from '@material-ui/icons/ErrorOutline';
import makeStyles from '@material-ui/core/styles/makeStyles';

import Alert from './Alert';

import { errorMessageFormatter } from './formatter/errorMessage';

interface IProps {
  error: any;
  onDismiss?: Function;
}

const useStyle = makeStyles((theme) => ({
  icon: {
    opacity: 0.8,
    color: theme.palette.error.main,
  },
}));

const ErrorMessageIcon = (props: IProps) => {
  const classes = useStyle(props);

  const showAlert = useCallback(async () => {
    await Alert.type.show(errorMessageFormatter(props.error));
    props.onDismiss && props.onDismiss();
  }, [props]);

  return (
    <IconButton onClick={showAlert}>
      <ErrorOutlineIcon className={classes.icon} />
    </IconButton>
  );
};

export default memo(ErrorMessageIcon);
