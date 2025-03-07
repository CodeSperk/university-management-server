import { model, Schema } from 'mongoose';
import {
  TGuardian,
  TLocalGuardian,
  TStudent,
  TUserName,
} from './student.interface';

const userNameSchema = new Schema<TUserName>(
  {
    firstName: {
      type: String,
      required: [true, 'First name is required'],
      trim: true,
      validate: function (fName: string) {
        const capitalized = fName.charAt(0).toUpperCase() + fName.slice(1);
        console.log(fName, capitalized);
        return fName === capitalized;
      },
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

const guardianSchema = new Schema<TGuardian>(
  {
    fatherName: {
      type: String,
      required: [true, "Father's name is required"],
      trim: true,
    },
    fatherOccupation: {
      type: String,
      required: [true, "Father's occupation is required"],
      trim: true,
    },
    fatherContactNo: {
      type: String,
      required: [true, "Father's contact number is required"],
    },
    motherName: {
      type: String,
      required: [true, "Mother's name is required"],
      trim: true,
    },
    motherOccupation: {
      type: String,
      required: [true, "Mother's occupation is required"],
      trim: true,
    },
    motherContactNo: {
      type: String,
      required: [true, "Mother's contact number is required"],
    },
  },
  { _id: false },
);

const localGuardianSchema = new Schema<TLocalGuardian>(
  {
    name: {
      type: String,
      required: [true, 'Local guardian name is required'],
      trim: true,
    },
    occupation: {
      type: String,
      required: [true, 'Local guardian occupation is required'],
      trim: true,
    },
    contactName: {
      type: String,
      required: [true, 'Local guardian contact name is required'],
      trim: true,
    },
    address: {
      type: String,
      required: [true, 'Local guardian address is required'],
      trim: true,
    },
  },
  { _id: false },
);

const studentSchema = new Schema<TStudent>({
  id: {
    type: String,
    unique: [true, 'Student ID must be unique'],
    required: [true, 'Student ID is required'],
  },
  name: {
    type: userNameSchema,
    required: [true, 'Name is required'],
  },
  gender: {
    type: String,
    enum: {
      values: ['male', 'female'],
      message: 'Gender must be either "male" or "female"',
    },
    required: [true, 'Gender is required'],
  },
  email: {
    type: String,
    required: [true, 'Email is required'],
    unique: [true, 'Email must be unique'],
    match: [/\S+@\S+\.\S+/, 'Please provide a valid email address'],
  },
  dateOfBirth: {
    type: String,
    validate: {
      validator: function (v: string) {
        return /^\d{4}-\d{2}-\d{2}$/.test(v); // Ensure date is in YYYY-MM-DD format
      },
      message: 'Date of birth must be in YYYY-MM-DD format',
    },
  },
  contactNo: {
    type: String,
    required: [true, 'Contact number is required'],
  },
  emergencyContactNo: {
    type: String,
    required: [true, 'Emergency contact number is required'],
  },
  bloodGroup: {
    type: String,
    enum: {
      values: ['A+', 'A-', 'B+', 'B-', 'O+', 'O-', 'AB+', 'AB-'],
      message:
        'Blood group must be one of the following: A+, A-, B+, B-, O+, O-, AB+, AB-',
    },
  },
  presentAddress: {
    type: String,
    required: [true, 'Present address is required'],
    trim: true,
  },
  permanentAddress: {
    type: String,
    required: [true, 'Permanent address is required'],
    trim: true,
  },
  guardian: {
    type: guardianSchema,
    required: [true, 'Guardian information is required'],
  },
  localGuardian: {
    type: localGuardianSchema,
    required: [true, 'Local guardian information is required'],
  },
  profileImg: {
    type: String,
    validate: {
      validator: function (v: string) {
        return /\.(jpg|jpeg|png|gif)$/.test(v); // Allow only image file extensions
      },
      message: 'Profile image must be a valid image file (jpg, jpeg, png, gif)',
    },
  },
  isActive: {
    type: String,
    enum: {
      values: ['active', 'blocked'],
      message: 'Status must be either "active" or "blocked"',
    },
    default: 'active',
  },
});

export const Student = model<TStudent>('Student', studentSchema);
