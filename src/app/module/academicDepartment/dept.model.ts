import { model, Schema } from 'mongoose';
import { TDepartment } from './dept.interface';
import AppError from '../../error/AppError';
import httpStatus from 'http-status';

const departmentSchema = new Schema<TDepartment>(
  {
    name: {
      type: String,
      required: true,
      unique: true,
    },
    academicFaculty: {
      type: Schema.Types.ObjectId,
      ref: 'AcademicFaculty',
    },
  },
  {
    timestamps: true,
  },
);

// departmentSchema.pre('save', async function (next) {
//   const isDepartmentExists = await Department.findOne({ name: this.name });
//   if (isDepartmentExists) {
//     throw new AppError(httpStatus.NOT_FOUND, `${this.name} is already exists.`);
//   }
//   next();
// });

departmentSchema.pre('findOneAndUpdate', async function (next) {
  const query = this.getQuery();
  const isDepartmentExist = await Department.findOne(query);

  if (!isDepartmentExist) {
    throw new AppError(
      httpStatus.NOT_FOUND,
      'This department does not exist! ',
    );
  }

  next();
});

export const Department = model<TDepartment>(
  'AcademicDepartment',
  departmentSchema,
);
