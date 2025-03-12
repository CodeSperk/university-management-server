import { model, Schema } from 'mongoose';
import { TFacultyMember, TFacultyMemberName } from './faculty.interface';

const facultyMemberNameSchema = new Schema<TFacultyMemberName>(
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

const facultyMemberSchema = new Schema<TFacultyMember>(
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
      type: facultyMemberNameSchema,
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
    password: {
      type: String,
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
    },
    academicDepartment: {
      type: Schema.Types.ObjectId,
      ref: 'Department',
    },
    isDeleted: {
      type: Boolean,
      default: false,
    },
  },
  { timestamps: true },
);

export const FacultyMember = model<TFacultyMember>(
  'FacultyMember',
  facultyMemberSchema,
);
