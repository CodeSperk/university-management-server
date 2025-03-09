import { model, Schema } from 'mongoose';
import { SemesterCode, SemesterNames, Months } from './semester.constants';
import { TAcademicSemester } from './semester.interface';

const SemesterSchema = new Schema<TAcademicSemester>(
  {
    name: {
      type: String,
      enum: SemesterNames,
      required: true,
    },
    year: { type: String, required: true },
    code: {
      type: String,
      enum: SemesterCode,
    },
    startMonth: {
      type: String,
      enum: Months,
    },
    endMonth: {
      type: String,
      enum: Months,
    },
  },
  { timestamps: true },
);

SemesterSchema.pre('save', async function (next) {
  const isSemesterExists = await AcademicSemester.findOne({
    year: this.year,
    name: this.name,
  });

  if (isSemesterExists) {
    throw new Error('Semester is already exists');
  }
  next();
});

export const AcademicSemester = model<TAcademicSemester>(
  'AcademicSemester',
  SemesterSchema,
);
