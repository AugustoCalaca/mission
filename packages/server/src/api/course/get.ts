import { Context } from 'koa';

import CourseModel from '../../models/CourseModel';
import { MESSAGE } from '../helpers';

import { isValidId } from './utils';

export const courseGet = async (ctx: Context) => {
  const id = ctx.params.id;

  if (!isValidId(id)) {
    ctx.status = 400;
    ctx.body = {
      status: MESSAGE.ERROR,
      message: MESSAGE.INVALID_ID,
      course: null,
    };

    return;
  }

  try {
    const course = await CourseModel.findById(id);

    if (!course) {
      ctx.status = 400;
      ctx.body = {
        status: MESSAGE.ERROR,
        message: MESSAGE.COURSE.NOT_FOUND,
        course: null,
      };

      return;
    }

    ctx.status = 200;
    ctx.body = {
      status: MESSAGE.OK,
      course,
    };

    return;
  } catch (err) {
    // eslint-disable-next-line
    console.log('err: ', err);

    ctx.status = 500;
    ctx.body = {
      status: MESSAGE.ERROR,
      message: err.message,
    };
  }
};
