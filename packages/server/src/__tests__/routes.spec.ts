import request from 'supertest';

import server from '../app';
import { disconnectMongoose, connectMongoose, clearDbAndRestartCounters, createCourse } from '../../test/helpers';

beforeAll(connectMongoose);
beforeEach(clearDbAndRestartCounters);
afterAll(() => {
  server.close();
  disconnectMongoose();
});

describe('Test routes', () => {
  it('route GET /courses', async () => {
    const course4 = await createCourse();
    const course3 = await createCourse();
    const course2 = await createCourse();
    const course1 = await createCourse();

    const response = await request(server).get('/courses').set('Accept', 'application/json');
    expect(response.status).toEqual(200);
    expect(response.body).toMatchObject({
      status: 'OK',
      courses: [
        {
          isActive: true,
          title: course1.title,
          subtitle: course1.subtitle,
          description: course1.description,
        },
        {
          isActive: true,
          title: course2.title,
          subtitle: course2.subtitle,
          description: course2.description,
        },
        {
          isActive: true,
          title: course3.title,
          subtitle: course3.subtitle,
          description: course3.description,
        },
        {
          isActive: true,
          title: course4.title,
          subtitle: course4.subtitle,
          description: course4.description,
        },
      ],
      pageInfo: {
        errors: null,
        page: 1,
        pageSize: 10, // default
        totalCount: 4,
        hasNextPage: false,
        hasPreviousPage: false,
      },
    });
  });

  it('route GET /courses get just second page of the list', async () => {
    const course5 = await createCourse();
    const course4 = await createCourse();
    const course3 = await createCourse();
    const course2 = await createCourse();
    const course1 = await createCourse();

    const response = await request(server).get('/courses?page=2&pageSize=2').set('Accept', 'application/json');
    expect(response.status).toEqual(200);
    expect(response.body).toMatchObject({
      status: 'OK',
      courses: [
        {
          isActive: true,
          title: course3.title,
          subtitle: course3.subtitle,
          description: course3.description,
        },
        {
          isActive: true,
          title: course4.title,
          subtitle: course4.subtitle,
          description: course4.description,
        },
      ],
      pageInfo: {
        errors: null,
        page: 2,
        totalCount: 5,
        hasNextPage: true, // course5
        hasPreviousPage: true,
      },
    });
  });

  it('route GET /courses/find', async () => {
    const course1 = await createCourse();
    const course2 = await createCourse();
    const course3 = await createCourse({ title: 'finded' });
    const course4 = await createCourse();
    console.log('course3', course3);

    const response = await request(server).get(`/courses/find`).query({ q: 'finded' });
    console.log('respon', response.body.courses);
    expect(response.status).toEqual(200);
    expect(response.body).toMatchObject({
      status: 'OK',
      courses: [
        {
          isActive: true,
          title: course3.title,
          subtitle: course3.subtitle,
          description: course3.description,
        },
      ],
      pageInfo: {
        errors: null,
        page: 1,
        pageSize: 10,
        totalCount: 4,
        hasNextPage: false,
        hasPreviousPage: false,
      },
    });
  });

  it('route GET /courses/:id', async () => {
    const course = await createCourse();

    const response = await request(server).get(`/courses/${course._id}`).set('Accept', 'application/json');
    expect(response.status).toEqual(200);
    expect(response.body).toMatchObject({
      status: 'OK',
      course: {
        isActive: true,
        title: course.title,
        subtitle: course.subtitle,
        description: course.description,
      },
    });
  });

  it('route POST /courses', async () => {
    const body = { course: { title: 'title', subtitle: 'subtitle', description: 'description' } };

    const response = await request(server).post('/courses').send(body).set('Accept', 'application/json');
    expect(response.status).toEqual(200);
    expect(response.body).toMatchObject({
      status: 'OK',
      message: 'Course successfully created',
      course: {
        isActive: true,
        ...body.course,
      },
    });
  });

  it('route POST /courses passing id and make your update', async () => {
    const newCourse = await createCourse();
    const body = {
      course: {
        id: newCourse._id,
        title: 'title updated',
        subtitle: 'subtitle updated',
        description: 'description updated',
      },
    };

    const response = await request(server).post('/courses').send(body).set('Accept', 'application/json');
    delete body.course.id;

    expect(response.status).toEqual(200);
    expect(response.body).toMatchObject({
      status: 'OK',
      message: 'Course successfully updated',
      course: {
        isActive: true,
        ...body.course,
      },
    });
  });
});
