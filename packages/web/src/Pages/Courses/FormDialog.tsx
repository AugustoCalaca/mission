import React, { forwardRef, memo, useCallback } from 'react';
import Button from '@material-ui/core/Button';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogTitle from '@material-ui/core/DialogTitle';
import Grid from '@material-ui/core/Grid';
import LinearProgress from '@material-ui/core/LinearProgress';
import Slide from '@material-ui/core/Slide';
import makeStyles from '@material-ui/core/styles/makeStyles';

import * as yup from 'yup';
import { useFormik } from 'formik';

// import { Toast, TextField } from '@mission/ui';
import { Toast, TextField } from '../../ui';

import { ICourse } from '../../interfaces/models/course';
import { saveCourse, updatedCourse } from '../../services/course';

interface IProps {
  opened: boolean;
  course?: ICourse | null;
  onComplete: (course: ICourse) => void;
  onCancel: () => void;
}

const validationSchema = yup.object().shape({
  title: yup.string().min(3).max(50).required(),
  subtitle: yup.string().min(3).max(200).required(),
  description: yup.string().min(3).max(500).required(),
});

const useStyle = makeStyles({
  content: {
    width: 600,
    maxWidth: 'calc(95vw - 50px)',
  },
  heading: {
    marginTop: 20,
    marginBottom: 10,
  },
});

const FormDialog = (props: IProps) => {
  const classes = useStyle(props);

  const formik = useFormik<Partial<ICourse>>({
    initialValues: {
      title: '',
      subtitle: '',
      description: '',
    },
    validationSchema,
    onSubmit(course) {
      if (course._id) {
        if (JSON.stringify(course) === JSON.stringify(props.course)) {
          return Toast.type.show('Same data. Make a change in at least one field.');
        }

        return updatedCourse(course._id, course).then((res) => {
          const { message, course } = res.data as any;
          Toast.type.show(message);
          props.onComplete(course);
        });
      }
      return saveCourse(course).then((res) => {
        const { message, course } = res.data as any;
        Toast.type.show(message);
        props.onComplete(course);
      });
    },
  });

  const handleEnter = useCallback(() => {
    formik.setValues(props.course ?? formik.initialValues, false);
  }, [formik, props.course]);

  const handleExit = useCallback(() => {
    formik.resetForm();
  }, [formik]);

  return (
    <Dialog
      open={props.opened}
      disableBackdropClick
      disableEscapeKeyDown
      onEnter={handleEnter}
      onExited={handleExit}
      TransitionComponent={Transition}
    >
      {formik.isSubmitting && <LinearProgress color="primary" />}

      <form onSubmit={formik.handleSubmit}>
        <DialogTitle>{formik.values!._id ? 'Edit' : 'New'} Course</DialogTitle>
        <DialogContent className={classes.content}>
          <Grid container spacing={2}>
            <Grid item xs={12} sm={6}>
              <TextField label="Title" name="title" formik={formik} />
            </Grid>
            <Grid item xs={12} sm={6}>
              <TextField multiline rowsMax={12} label="Description" name="description" formik={formik} />
            </Grid>
            <Grid item xs={12} sm={6}>
              <TextField multiline rowsMax={9} label="Subtitle" name="subtitle" formik={formik} />
            </Grid>
          </Grid>
        </DialogContent>
        <DialogActions>
          <Button onClick={props.onCancel}>Cancel</Button>
          <Button color="primary" variant="contained" type="submit" disabled={formik.isSubmitting}>
            Save
          </Button>
        </DialogActions>
      </form>
    </Dialog>
  );
};

const SlideRef = (props: any, ref: any) => {
  return <Slide direction="up" {...props} ref={ref} />;
};

const Transition = memo(forwardRef(SlideRef));

export default memo(FormDialog);
