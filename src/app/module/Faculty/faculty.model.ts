import { model, Schema } from 'mongoose';
import { TFaculty, TFacultyName } from './faculty.interface';

const facultyNameSchema = new Schema<TFacultyName>(
  {
    firstName: {
      type: String,
      required: [true, 'First name is required'],
      trim: true,
    },
    middleName: {
      type: String,
      trim: true,
    },
    lastName: {
      type: String,
      required: [true, 'Last name is required'],
      trim: true,
    },
  },
  { _id: false },
);

const facultySchema = new Schema<TFaculty>(
  {
    id: {
      type: String,
      required: [true, 'Faculty member ID is required'],
      unique: true,
    },
    designation: {
      type: String,
    },
    name: {
      type: facultyNameSchema,
    },
    gender: {
      type: String,
      enum: {
        values: ['male', 'female'],
        message: 'Gender must be either "male" or "female"',
      },
    },
    dateOfBirth: {
      type: String,
    },
    email: {
      type: String,
      unique: true,
    },
    user: {
      type: Schema.Types.ObjectId,
      ref: 'User',
    },
    contactNo: {
      type: String,
    },
    emergencyContactNo: {
      type: String,
    },
    presentAddress: {
      type: String,
    },
    permanentAddress: {
      type: String,
    },
    profileImage: {
      type: String,
      default: '',
    },
    academicDepartment: {
      type: Schema.Types.ObjectId,
      ref: 'Department',
    },
    academicFaculty: {
      type: Schema.Types.ObjectId,
      ref: 'AcademicFaculty',
    },
    isDeleted: {
      type: Boolean,
      default: false,
    },
  },
  { timestamps: true },
);

export const Faculty = model<TFaculty>('Faculty', facultySchema);
