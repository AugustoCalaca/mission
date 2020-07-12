import React, { memo, useCallback, useContext } from 'react';
import TablePaginationCore, { LabelDisplayedRowsArgs, TablePaginationProps } from '@material-ui/core/TablePagination';

import { ScrollTopContext } from '../Pages';

import { IPaginationParams } from './types/pagination';

type IProps = Partial<Omit<TablePaginationProps, 'onChange'>> & {
  disabled?: boolean;
  paginationParams: IPaginationParams;
  total: number;
  onChange: (params: { page?: number; pageSize?: number }) => void;
};

const TablePagination = (props: IProps) => {
  const {
    disabled,
    total,
    paginationParams: { page, pageSize },
    onChange,
    ...extra
  } = props;

  const scrollTop = useContext(ScrollTopContext);

  const handleChangePage = useCallback(
    (event: any, page: number) => {
      scrollTop && scrollTop();
      onChange({ page });
    },
    [onChange, scrollTop],
  );

  const handleChangeRowsPerPage = useCallback(
    (event: any) => {
      scrollTop && scrollTop();
      onChange({ pageSize: Number(event.target.value) });
    },
    [onChange, scrollTop],
  );

  const labelDisplayedRows = useCallback(
    ({ from, to, count }: LabelDisplayedRowsArgs) => `${from}-${to} de ${count}`,
    [],
  );

  return (
    <div style={disabled ? { pointerEvents: 'none', opacity: 0.7 } : {}}>
      <TablePaginationCore
        labelRowsPerPage="items"
        labelDisplayedRows={labelDisplayedRows}
        rowsPerPageOptions={[10, 25, 50]}
        component={'div'}
        {...extra}
        count={total}
        rowsPerPage={pageSize}
        page={page}
        onChangeRowsPerPage={handleChangeRowsPerPage}
        onChangePage={handleChangePage}
      />
    </div>
  );
};

export default memo(TablePagination);
