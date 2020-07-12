import React, { memo } from 'react';
import Button from '@material-ui/core/Button';
import ErrorOutlineIcon from '@material-ui/icons/ErrorOutline';
import makeStyles from '@material-ui/core/styles/makeStyles';
import Typography from '@material-ui/core/Typography';

import { errorMessageFormatter } from './formatter/errorMessage';

interface IProps {
  error: any;
  tryAgain?: () => void;
}

const useStyle = makeStyles((theme) => ({
  root: {
    textAlign: 'center',
    margin: '20px 0',
  },
  icon: {
    opacity: 0.8,
    color: theme.palette.error.main,
  },
  button: {
    marginTop: 20,
  },
}));

const ErrorMessage = (props: IProps) => {
  const { error, tryAgain } = props;
  const classes = useStyle(props);

  if (!error) {
    return null;
  }

  return (
    <div className={classes.root}>
      <ErrorOutlineIcon fontSize="large" className={classes.icon} />
      <Typography variant="body1">{errorMessageFormatter(error)}</Typography>

      {tryAgain && (
        <Button onClick={tryAgain} className={classes.button} color="primary" variant="outlined">
          Try again
        </Button>
      )}
    </div>
  );
};

export default memo(ErrorMessage);
