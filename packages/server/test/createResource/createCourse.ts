import CourseModel, { ICourse } from '../../src/models/CourseModel';

export const createCourse = async (payload: Partial<ICourse> = {}) => {
  const n = (global.__COUNTERS__.course += 1);
  const { title, subtitle, description } = payload;

  return new CourseModel({
    title: title || `title${n}`,
    subtitle: subtitle || `subtitle${n}`,
    description: description || `description${n}`,
  }).save();
};
