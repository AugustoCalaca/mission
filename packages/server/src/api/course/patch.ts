import { Context } from 'koa';

import { MESSAGE } from '../helpers';

import { updatePatch } from './updatePatch';
import { isValidId } from './utils';

export const coursePatch = async (ctx: Context) => {
  const courseData = ctx.request.body.course;
  const id = ctx.params.id;

  if (!isValidId(id)) {
    // eslint-disable-next-line
    console.log(MESSAGE.INVALID_ID);
    ctx.status = 400;
    ctx.body = {
      errors: MESSAGE.ERROR,
      message: MESSAGE.INVALID_ID,
    };
  }

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

  try {
    const { errors, message, course } = await updatePatch({ ...courseData, id });

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
