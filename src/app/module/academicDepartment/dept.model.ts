import { model, Schema } from 'mongoose';
import { TDepartment } from './dept.interface';

const departmentSchema = new Schema<TDepartment>(
  {
    name: {
      type: String,
      required: true,
      unique: true,
    },
    faculty: {
      type: Schema.Types.ObjectId,
      ref: 'Faculty',
    },
  },
  {
    timestamps: true,
  },
);

departmentSchema.pre('save', async function (next) {
  const isDepartmentExists = await Department.findOne({ name: this.name });
  if (isDepartmentExists) {
    throw new Error(`${this.name} is already exists.`);
  }
  next();
});

export const Department = model<TDepartment>('Department', departmentSchema);
