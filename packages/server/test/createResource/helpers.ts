import { Model, Document } from 'mongoose';

export const getOrCreate = async <Type extends Document>(
  model: Model<Type>,
  createFn: (...args: any[]) => Promise<Type>,
) => {
  const data = await model.findOne();

  if (data) {
    return data;
  }

  return createFn();
};
