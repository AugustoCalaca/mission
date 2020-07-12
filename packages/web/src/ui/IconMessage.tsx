import React, { memo, Props } from 'react';
import makeStyles from '@material-ui/core/styles/makeStyles';
import Typography from '@material-ui/core/Typography';

interface IProps extends Props<null> {
  message: string;
}

const useStyle = makeStyles({
  root: {
    textAlign: 'center',
    padding: '20px',
    width: 350,
    maxWidth: '100%',
    margin: 'auto',
  },
  icon: {
    opacity: 0.7,
  },
});

const IconMessage = (props: IProps | any) => {
  const classes = useStyle(props);

  return (
    <div className={classes.root}>
      {props.children}
      <Typography variant="body1">{props.message}</Typography>
    </div>
  );
};

export default memo(IconMessage);
