import React, { Fragment, memo, useState, useEffect, useCallback } from 'react';
import Button from '@material-ui/core/Button';
import Card from '@material-ui/core/Card';
import CardContent from '@material-ui/core/CardContent';
import Grid from '@material-ui/core/Grid';
import IconButton from '@material-ui/core/IconButton';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import RefreshIcon from '@material-ui/icons/Refresh';

// import {
//   CardLoader,
//   TableWrapper,
//   EmptyAndErrorMessages,
//   SearchField,
//   TableCellActions,
//   TableCellSortable,
//   TablePagination,
//   Toolbar,
//   IPaginationResponse,
//   IPaginationParams,
// } from '@mission/ui';

import {
  CardLoader,
  TableWrapper,
  EmptyAndErrorMessages,
  SearchField,
  TableCellActions,
  TableCellSortable,
  TablePagination,
  Toolbar,
  IPaginationParams,
} from '../../ui';

import { ICourse } from '../../interfaces/models/course';
import { listCourses } from '../../services/course';

import FormDialog from './FormDialog';

import ListItem from './ListItem';

const UserListPage = memo(() => {
  const [formOpened, setFormOpened] = useState(false);
  const [current, setCurrent] = useState<ICourse | null>();
  const [isLoading, setIsLoading] = useState(false);
  const [data, setData] = useState();
  const [details, setDetails] = useState(false);
  const [params, setParams] = useState({ page: 0, pageSize: 10, term: '' });

  useEffect(() => {
    setIsLoading(true);

    const fetchList = async () => {
      const { data } = await listCourses(params);

      setData(data);
      setIsLoading(false);
    };

    fetchList();
  }, [params]);

  const handlePagination = ({ page, pageSize, term }: IPaginationParams) => {
    setDetails(false);
    setParams((prev) => ({
      page: typeof page !== 'undefined' && page >= 0 ? page : prev.page, // page can to be zero
      pageSize: pageSize || prev.pageSize,
      term: term || '',
    }));
  };

  const handleCreate = useCallback(() => {
    setCurrent(null);
    setFormOpened(true);
  }, []);

  const handleEdit = useCallback((current: ICourse) => {
    setCurrent(current);
    setFormOpened(true);
  }, []);

  const handleDetails = useCallback((current: ICourse) => {
    setDetails(true);
    setData((prev) => ({ ...prev, courses: [current], pageInfo: { totalCount: 1 } }));
  }, []);

  const formCallback = useCallback((course) => {
    setParams((prev) => ({ ...prev, page: 0, term: course.title }));
    setFormOpened(false);
  }, []);

  const formCancel = useCallback(() => setFormOpened(false), []);

  const handleRefresh = useCallback(() => {
    setDetails(false);
    setParams((prev) => ({ ...prev, term: '' }));
  }, []);

  const pageInfo = data?.pageInfo || { totalCount: 0 };
  const courses = data?.courses || [];

  return (
    <Fragment>
      <Toolbar title="Courses" />

      <Card>
        <FormDialog opened={formOpened} course={current} onComplete={formCallback} onCancel={formCancel} />

        <CardLoader show={isLoading} />

        <CardContent>
          <Grid container justify="space-between" alignItems="center" spacing={2}>
            <Grid item xs={12} sm={6} lg={4}>
              <SearchField paginationParams={params} onChange={handlePagination} />
            </Grid>

            <Grid item xs={12} sm={'auto'}>
              <Button fullWidth variant="contained" color="primary" onClick={handleCreate}>
                Add
              </Button>
            </Grid>
          </Grid>
        </CardContent>

        <TableWrapper minWidth={500}>
          <Table>
            <TableHead>
              <TableRow>
                <TableCellSortable paginationParams={params} disabled={false} onChange={() => {}} column="title">
                  Title
                </TableCellSortable>
                <TableCellSortable paginationParams={params} disabled={false} onChange={() => {}} column="subtitle">
                  Subtitle
                </TableCellSortable>
                {details && (
                  <TableCellSortable paginationParams={params} disabled={true} column="description">
                    Description
                  </TableCellSortable>
                )}
                <TableCellActions>
                  <IconButton disabled={false} onClick={handleRefresh}>
                    <RefreshIcon />
                  </IconButton>
                </TableCellActions>
              </TableRow>
            </TableHead>
            <TableBody>
              <EmptyAndErrorMessages
                colSpan={3}
                error={false}
                loading={false}
                hasData={!!(pageInfo.totalCount > 0)}
                onTryAgain={handleRefresh}
              />
              {courses.map((course) => (
                <ListItem
                  key={course._id}
                  course={course}
                  onDetails={handleDetails}
                  details={details}
                  onEdit={handleEdit}
                  onDeleteComplete={handleRefresh}
                />
              ))}
            </TableBody>
          </Table>
        </TableWrapper>

        <TablePagination
          total={pageInfo!.totalCount}
          disabled={details}
          paginationParams={params}
          onChange={handlePagination}
        />
      </Card>
    </Fragment>
  );
});

export default UserListPage;
