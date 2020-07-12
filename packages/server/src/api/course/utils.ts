import * as yup from 'yup';
import { Types } from 'mongoose';

import CourseModel from '../../models/CourseModel';

export type CourseData = {
  id?: string;
  title: string;
  subtitle: string;
  description: string;
};

export type ValidateCourse = {
  errors: string[] | null;
  course: CourseData | Partial<CourseData> | null;
};

const courseSchema = yup.object().shape({
  id: yup.string().min(1),
  title: yup.string().min(3).max(50).required(),
  subtitle: yup.string().min(3).max(200).required(),
  description: yup.string().min(3).max(500).required(),
});

export const validateCourse = async (courseData: CourseData): Promise<ValidateCourse> => {
  try {
    await courseSchema.validate(courseData);
  } catch (err) {
    return {
      errors: err.message,
      course: null,
    };
  }

  return {
    errors: null,
    course: courseData,
  };
};

const coursePatchSchema = yup.object().shape({
  title: yup.string().min(3).max(20),
  subtitle: yup.string().min(3).max(200),
  description: yup.string().min(3).max(500),
});

export const validateCoursePatch = async (coursePatchData: Partial<CourseData>): Promise<ValidateCourse> => {
  try {
    await coursePatchSchema.validate(coursePatchData);
  } catch (err) {
    return {
      errors: err.message,
      course: null,
    };
  }

  return {
    errors: null,
    course: coursePatchData,
  };
};

export const updateCoursePatch = async (coursePatchData: Partial<CourseData>) => {
  const course = await CourseModel.findById(Types.ObjectId(coursePatchData.id));

  return CourseModel.findByIdAndUpdate(
    Types.ObjectId(coursePatchData.id),
    {
      $set: {
        title: coursePatchData.title || course?.title,
        subtitle: coursePatchData.subtitle || course?.subtitle,
        description: coursePatchData.description || course?.description,
      },
    },
    {
      new: true,
    },
  );
};

export const updateCourse = async (courseData: CourseData) => {
  return CourseModel.findByIdAndUpdate(
    Types.ObjectId(courseData.id),
    {
      $set: {
        title: courseData.title,
        subtitle: courseData.subtitle,
        description: courseData.description,
      },
    },
    {
      new: true,
    },
  );
};

export const createCourse = async (courseData: CourseData) => {
  return new CourseModel({
    title: courseData.title,
    subtitle: courseData.subtitle,
    description: courseData.description,
  }).save();
};

export const isValidId = (id: string) => {
  return Types.ObjectId.isValid(id);
};
