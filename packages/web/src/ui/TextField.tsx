import React, { ChangeEvent, memo, useCallback } from 'react';
import CircularProgress from '@material-ui/core/CircularProgress/CircularProgress';
import InputAdornment from '@material-ui/core/InputAdornment/InputAdornment';
import TextFieldCore, { TextFieldProps } from '@material-ui/core/TextField';
import { FormikProps } from 'formik';

type IProps = TextFieldProps & {
  name: string;
  loading?: boolean;
  formik?: FormikProps<any>;
};

const TextField = ({ formik, value, name, loading, onChange, InputProps, ...props }: IProps) => {
  value = formik ? formik.values[name] : value;

  const handleChange = useCallback(
    (e: ChangeEvent<HTMLInputElement>) => {
      if (!formik) {
        onChange(e);
        return;
      }

      formik.setFieldTouched(name, true, false);
      formik.setFieldValue(name, e.currentTarget.value, true);
    },
    [formik, name, onChange],
  );

  const hasError = formik && (formik.touched[name] || formik.submitCount > 0) && !!formik.errors[name];

  return (
    <TextFieldCore
      error={hasError}
      {...props}
      disabled={formik?.isSubmitting || props.disabled}
      helperText={hasError ? formik.errors[name] : props.helperText}
      name={name}
      value={value ?? ''}
      onChange={handleChange}
      InputProps={{
        endAdornment: !loading ? null : (
          <InputAdornment position="end">
            <CircularProgress color="secondary" size={20} />
          </InputAdornment>
        ),
        ...(InputProps || {}),
      }}
    />
  );
};

export default memo(TextField);
