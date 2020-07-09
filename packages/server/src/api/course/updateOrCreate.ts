import { MESSAGE } from '../helpers';

import { CourseData, validateCourse, updateCourse, createCourse, isValidId } from './utils';

export const updateOrCreate = async (courseData: CourseData) => {
  const { errors, course } = await validateCourse(courseData);
  if (errors !== null) {
    return {
      errors,
      course: null,
    };
  }

  if (course?.id) {
    if (!isValidId(course.id)) {
      return {
        errors: MESSAGE.INVALID_ID,
        course: null,
      };
    }

    const updatedCourse = await updateCourse(courseData);
    if (!updatedCourse) {
      return {
        errors: MESSAGE.COURSE.UPDATING,
        course: null,
      };
    }

    return {
      errors: null,
      message: 'Course successfully updated',
      course: updatedCourse,
    };
  }

  const newCourse = await createCourse(courseData);

  if (!newCourse) {
    return {
      errors: MESSAGE.COURSE.CREATING,
      course: null,
    };
  }

  return {
    errors: null,
    message: 'Course successfully created',
    course: newCourse,
  };
};
