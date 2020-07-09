import faker from 'faker';

import { connectDatabase } from '../src/common/database';
import CourseModel from '../src/models/CourseModel';

export const createCourse = async () => {
  return new CourseModel({
    title: faker.lorem.words(3),
    subtitle: faker.lorem.words(10),
    description: faker.lorem.paragraph(3),
  }).save();
};

const runSeed = async () => {
  try {
    await connectDatabase();
  } catch (err) {
    // eslint-disable-next-line
    console.error('[SEED] - Error connect database', err);
    process.exit(1);
  }

  try {
    for (let i = 0; i < 100; i++) {
      await createCourse();
    }
  } catch (err) {
    // eslint-disable-next-line
    console.error('[SEED] - Error running seed\n', err);
  }

  process.exit(0);
};

export default runSeed();
