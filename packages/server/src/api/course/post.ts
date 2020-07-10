import { Context } from 'koa';

import { MESSAGE } from '../helpers';

import { updateOrCreate } from './updateOrCreate';

export const coursePost = async (ctx: Context) => {
  try {
    const courseData = ctx.request.body;

    if (!courseData) {
      // eslint-disable-next-line
      console.log(MESSAGE.COURSE.MISSING);

      ctx.status = 400;
      ctx.body = {
        status: MESSAGE.ERROR,
        message: MESSAGE.COURSE.MISSING,
      };

      return;
    }

    ctx.body = {
      errors: [],
      data: {},
    };

    const { errors, message, course } = await updateOrCreate(courseData);

    if (errors) {
      ctx.status = 400;
      ctx.body = {
        status: MESSAGE.ERROR,
        message: errors,
        course,
      };
      return;
    }

    ctx.status = 200;
    ctx.body = {
      status: MESSAGE.OK,
      message: message,
      course,
    };

    return;
  } catch (err) {
    // eslint-disable-next-line
    console.log('err:', err);

    ctx.status = 500;
    ctx.body = {
      status: MESSAGE.ERROR,
      message: err,
    };
  }
};
