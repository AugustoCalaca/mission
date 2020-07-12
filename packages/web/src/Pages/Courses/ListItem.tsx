import React, { memo, useCallback, useMemo, useState } from 'react';
import TableCell from '@material-ui/core/TableCell';
import TableRow from '@material-ui/core/TableRow';
import IconButton from '@material-ui/core/IconButton';
import DeleteIcon from '@material-ui/icons/Delete';
import EditIcon from '@material-ui/icons/Edit';
import More from '@material-ui/icons/More';

// import { Alert, Toast, IDropDownOption, TableCellActions } from '@mission/ui';

import { Alert, Toast, IDropDownOption, TableCellActions } from '../../ui';

import { ICourse } from '../../interfaces/models/course';
import { removeCourse } from '../../services/course';

interface IProps {
  course: ICourse;
  details: boolean;
  onDetails: (course: ICourse) => void;
  onEdit: (course: ICourse) => void;
  onDeleteComplete: () => void;
}

const ListItem = (props: IProps) => {
  const { course, onEdit, onDetails, onDeleteComplete, details } = props;

  const [deleted, setDeleted] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(false);

  const handleDismissError = useCallback(() => setError(false), []);

  const handleEdit = useCallback(() => {
    onEdit(course);
  }, [onEdit, course]);

  const handleDelete = useCallback(async () => {
    const confirmDelete = await Alert.type.confirm(`Do you want to delete the course "${course.title}"?`);
    setLoading(true);

    if (!confirmDelete) {
      setLoading(false);
      return;
    }

    const res = await removeCourse(course._id);
    if (res.status === 200) {
      Toast.type.show(`"${course.title}" sucessfully deleted`);
      setLoading(false);
      setDeleted(true);
      onDeleteComplete();
    }
  }, [course, onDeleteComplete]);

  const handleDetails = useCallback(async () => {
    onDetails(course);
  }, [course, onDetails]);

  const options = useMemo<IDropDownOption[]>(() => {
    return [
      { text: 'Edit', icon: EditIcon, handler: handleEdit },
      { text: 'Delete', icon: DeleteIcon, handler: handleDelete },
    ];
  }, [handleDelete, handleEdit]);

  if (deleted) {
    return null;
  }

  return (
    <TableRow style={{ tableLayout: 'fixed' }}>
      <TableCell>{course.title}</TableCell>
      <TableCell>{course.subtitle}</TableCell>
      {details && <TableCell>{course.description}</TableCell>}
      {!details && (
        <IconButton onClick={handleDetails} color="inherit">
          <More />
        </IconButton>
      )}
      <TableCellActions options={options} loading={loading} error={error} onDismissError={handleDismissError} />
    </TableRow>
  );
};

export default memo(ListItem);
