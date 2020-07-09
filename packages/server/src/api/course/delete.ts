import { Context } from 'koa';

import { MESSAGE } from '../helpers';

import CourseModel from '../../models/CourseModel';

import { isValidId } from './utils';

export const courseDelete = async (ctx: Context) => {
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
    const course = await CourseModel.findByIdAndDelete(id);

    if (!course) {
      ctx.status = 400;
      ctx.body = {
        status: MESSAGE.ERROR,
        message: MESSAGE.COURSE.DELETING,
      };

      return;
    }

    ctx.status = 200;
    ctx.body = {
      status: MESSAGE.OK,
      course,
    };
  } catch (err) {
    // eslint-disable-next-line
    console.log('err: ', err)

    ctx.status = 500;
    ctx.body = {
      status: MESSAGE.ERROR,
      message: err.message,
    };
  }
};
