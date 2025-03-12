import { model, Schema } from 'mongoose';
import { TFaculty } from './academicFaculty.interface';

const facultySchema = new Schema<TFaculty>(
  {
    name: {
      type: String,
      required: true,
    },
  },
  {
    timestamps: true,
  },
);

export const Faculty = model<TFaculty>('Faculty', facultySchema);
