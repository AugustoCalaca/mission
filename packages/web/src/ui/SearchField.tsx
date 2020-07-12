import React, { ChangeEvent, memo, useCallback, useMemo, useRef, useState } from 'react';
import IconButton from '@material-ui/core/IconButton';
import InputAdornment from '@material-ui/core/InputAdornment';
import SearchIcon from '@material-ui/icons/Search';
import makeStyles from '@material-ui/core/styles/makeStyles';

import { IPaginationParams } from './types/pagination';

import TextField from './TextField';

interface IProps {
  paginationParams: IPaginationParams;
  onChange: (params: { term: string; page: number }) => void;
}

const useStyle = makeStyles({
  iconButton: {
    marginRight: -15,
  },
});

const SearchField = (props: IProps) => {
  const { paginationParams, onChange } = props;

  const [searchTerm, setSearchTerm] = useState(paginationParams.term ?? '');
  const classes = useStyle(props);

  const inputLabelProps = useRef({ shrink: true }).current;
  const inputProps = useMemo(() => {
    return {
      endAdornment: (
        <InputAdornment position="end">
          <IconButton disabled={true} className={classes.iconButton}>
            <SearchIcon />
          </IconButton>
        </InputAdornment>
      ),
    };
  }, [classes.iconButton]);

  const handleChange = useCallback(
    (event: ChangeEvent<HTMLInputElement>) => {
      const value = event.currentTarget.value ?? '';
      setSearchTerm(value);

      if (value?.length > 2) {
        onChange({ term: value, page: 0 });
        return;
      }

      if (paginationParams.term) {
        onChange({ term: '', page: 0 });
      }
    },
    [onChange, paginationParams.term],
  );

  return (
    <TextField
      label="Search Course"
      name="search"
      value={searchTerm}
      onChange={handleChange}
      margin="none"
      fullWidth={false}
      placeholder="Type at least 3 characters..."
      InputLabelProps={inputLabelProps}
      InputProps={inputProps}
    />
  );
};

export default memo(SearchField);
