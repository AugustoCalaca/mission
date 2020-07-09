import { MESSAGE } from '../helpers';

import { CourseData, validateCoursePatch, updateCoursePatch, isValidId } from './utils';

export const updatePatch = async (courseData: Partial<CourseData>) => {
  const { errors, course } = await validateCoursePatch(courseData);

  if (errors !== null) {
    return {
      errors,
      course: null,
    };
  }

  if (!isValidId(course.id)) {
    return {
      errors: MESSAGE.INVALID_ID,
      course: null,
    };
  }

  const updatedCourse = await updateCoursePatch(courseData);
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
};
