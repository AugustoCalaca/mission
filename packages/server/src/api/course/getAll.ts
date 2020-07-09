import { Context } from 'koa';

import { MESSAGE, getPageInfo } from '../helpers';
import CourseModel from '../../models/CourseModel';

export const coursesGetAll = async (ctx: Context) => {
  const pageInfo = await getPageInfo(ctx, CourseModel);

  if (pageInfo.errors) {
    ctx.status = 400;
    ctx.body = {
      status: MESSAGE.ERROR,
      errors: pageInfo.errors,
    };

    return;
  }

  const courses = await CourseModel.find().skip(pageInfo.skips).limit(pageInfo.pageSize).sort({ createdAt: -1 });

  ctx.status = 200;
  ctx.body = {
    status: MESSAGE.OK,
    courses,
    pageInfo,
  };
};
