import Router from '@koa/router';

import {
  courseGet,
  coursesGetAll,
  coursesGetFind,
  coursePost,
  coursePut,
  coursePatch,
  courseDelete,
} from './api/course';

const router = new Router();

router.get('/courses', coursesGetAll);
router.get('/courses/find', coursesGetFind);
router.get('/courses/:id', courseGet);
router.post('/courses', coursePost);
router.put('/courses/:id', coursePut);
router.patch('/courses/:id', coursePatch);
router.delete('/courses/:id', courseDelete);

export { router };
