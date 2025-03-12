import { model, Schema } from 'mongoose';
import { TCourse, TPreRequisiteCourses } from './course.interface';

const preRequisiteCoursesSchema = new Schema<TPreRequisiteCourses>({
  course: {
    type: Schema.Types.ObjectId,
    ref: 'Course',
  },
  isDeleted: {
    type: Boolean,
    default: false,
  },
});

const courseSchema = new Schema<TCourse>(
  {
    title: {
      type: String,
      required: [true, 'title is required'],
      unique: true,
      trim: true,
    },
    prefix: {
      type: String,
      required: [true, 'prefix is required'],
      trim: true,
    },
    code: {
      type: Number,
      required: [true, 'code is required'],
      trim: true,
    },
    credits: {
      type: Number,
      required: [true, 'credits is required'],
      trim: true,
    },
    isDeleted: {
      type: Boolean,
      default: false,
    },
    preRequisiteCourses: [preRequisiteCoursesSchema],
  },
  { timestamps: true },
);

export const Course = model<TCourse>('Course', courseSchema);
