import { Context } from 'koa';

import { MESSAGE, getPageInfo } from '../helpers';
import CourseModel from '../../models/CourseModel';

export const coursesGetFind = async (ctx: Context) => {
  const { q } = ctx.query;

  if (!q) {
    ctx.status = 400;
    ctx.body = {
      status: MESSAGE.ERROR,
      errors: MESSAGE.FIND.ERRORS,
    };

    return;
  }

  const where = {
    $or: [
      {
        title: {
          $regex: new RegExp(`^${q}`, 'ig'),
        },
      },
      {
        subtitle: {
          $regex: new RegExp(`^${q}`, 'ig'),
        },
      },
    ],
  };

  const pageInfo = await getPageInfo(ctx, CourseModel, where);

  if (pageInfo.errors) {
    ctx.status = 400;
    ctx.body = {
      status: MESSAGE.ERROR,
      errors: pageInfo.errors,
    };

    return;
  }

  const courses = await CourseModel.find(where).skip(pageInfo.page).limit(pageInfo.pageSize).sort({ createdAt: -1 });

  ctx.status = 200;
  ctx.body = {
    status: MESSAGE.OK,
    courses,
    pageInfo,
  };
};
