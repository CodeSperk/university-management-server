import { model, Schema } from 'mongoose';
import { TSemesterRegistration } from './semesterRegistration.interface';
import { SemesterRegestrationStatus } from './semesterRegistration.constants';

const semesterRegistrationSchema = new Schema<TSemesterRegistration>(
  {
    academicSemester: {
      type: Schema.Types.ObjectId,
      required: true,
      unique: true,
      ref: 'AcademicSemester',
    },
    status: {
      type: String,
      enum: SemesterRegestrationStatus,
      default: 'UPCOMMING',
    },
    startDate: {
      type: Date,
      required: true,
    },
    endDate: {
      type: Date,
      required: true,
    },
    minCredit: {
      type: Number,
      default: 3,
    },
    maxCreding: {
      type: Number,
      default: 16,
    },
  },
  { timestamps: true },
);

export const SemesterRegistration = model<TSemesterRegistration>(
  'RegisteredSemester',
  semesterRegistrationSchema,
);
