import { model, Schema } from 'mongoose';
import { TAcademicFaculty } from './academicFaculty.interface';

const facultySchema = new Schema<TAcademicFaculty>(
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

export const AcademicFaculty = model<TAcademicFaculty>(
  'AcademicFaculty',
  facultySchema,
);
