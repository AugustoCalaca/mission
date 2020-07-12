import mongoose, { Document, Model } from 'mongoose';

const CourseSchema = new mongoose.Schema(
  {
    title: {
      type: String,
      required: true,
      trim: true,
      default: 'Awesome title',
    },
    subtitle: {
      type: String,
      required: true,
      trim: true,
      default: 'Awesome subtitle',
    },
    description: {
      trim: true,
      type: String,
      required: true,
      default: 'Awesome description',
    },
    isActive: {
      type: Boolean,
      default: true,
    },
    startedAt: {
      type: Date,
      required: true,
      default: new Date(),
    },
  },
  {
    timestamps: {
      createdAt: 'createdAt',
      updatedAt: 'updatedAt',
    },
    collection: 'Course',
  },
);

export interface ICourse extends Document {
  title: string;
  subtitle: string;
  description: string;
  isActive: boolean;
  startedAt: Date;
  createdAt: Date;
  updatedAt: Date;
}

const CourseModel: Model<ICourse> = mongoose.model('Course', CourseSchema);

export default CourseModel;
