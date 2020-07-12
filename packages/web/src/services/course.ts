import { AxiosResponse } from 'axios';

// import { IPaginationParams, IPaginationResponse } from '@mission/ui';
import { IPaginationParams, IPaginationResponse } from '../ui';

import { ICourse } from '../interfaces/models/course';

import { api } from './api';

export const listCourses = ({
  page,
  pageSize,
  term,
}: IPaginationParams): Promise<AxiosResponse<IPaginationResponse<ICourse>>> => {
  return api.get(`/courses/${term ? 'find' : ''}`, { params: { page, pageSize, q: term } });
};

export const getCourseById = (id: string): Promise<AxiosResponse<ICourse>> => {
  return api.get(`courses/${id}`);
};

export const saveCourse = (model: Partial<ICourse>): Promise<AxiosResponse<ICourse>> => {
  return api.post('/courses', model);
};

export const updatedCourse = (id: string, model: Partial<ICourse>): Promise<AxiosResponse<ICourse>> => {
  return api.put(`/courses/${id}`, model);
};

export const removeCourse = (id: string): Promise<AxiosResponse<void>> => {
  return api.delete(`/courses/${id}`);
};
