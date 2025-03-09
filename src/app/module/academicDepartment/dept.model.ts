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

export const Department = model<TDepartment>('Department', departmentSchema);
