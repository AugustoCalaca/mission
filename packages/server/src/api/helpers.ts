import { Context } from 'koa';
import { Model } from 'mongoose';

export const MESSAGE = {
  INVALID_ID: 'Invalid id',
  ERROR: 'ERROR',
  OK: 'OK',
  PAGE_INFO: {
    ERRORS: {
      NEGATIVE: 'Pagination values should be positive values',
    },
  },
  FIND: {
    ERRORS: 'Missing param `q` to find results',
  },
  COURSE: {
    CREATING: 'Some error occurred while creating course',
    MISSING: 'Missing course',
    NOT_FOUND: 'Course not found',
    UPDATING: 'Some error occurred while updating course',
    DELETING: 'Some error occurred while deleting course',
  },
};

export const getPageAndPageSize = (ctx: Context) => {
  const { page = 0, pageSize = 10 } = ctx.query;

  if (page < 0 || pageSize < 1) {
    return {
      skips: null,
      page: null,
      pageSize: null,
      errors: [
        {
          data: { page, pageSize },
          message: MESSAGE.PAGE_INFO.ERRORS.NEGATIVE,
        },
      ],
    };
  }

  const pageInt = parseInt(page, 10);
  const mongoSkips = pageInt * pageSize;
  const mongoLimit = parseInt(pageSize, 10);

  return {
    skips: mongoSkips,
    page: pageInt,
    pageSize: mongoLimit,
    errors: null,
  };
};

export const getPageInfo = async (ctx: Context, model: Model<any>) => {
  const { errors, skips, page, pageSize } = getPageAndPageSize(ctx);

  if (errors) {
    return {
      errors,
      skips,
      page,
      pageSize,
      totalCount: null,
      hasNextPage: null,
      hasPreviousPage: null,
    };
  }

  const totalCount = await model.count({});
  const hasPreviousPage = skips > 0;
  const hasNextPage = skips + pageSize < totalCount;

  return {
    errors: null,
    skips,
    page,
    pageSize,
    totalCount,
    hasNextPage,
    hasPreviousPage,
  };
};
