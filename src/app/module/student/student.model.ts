import { model, Schema } from 'mongoose';
import {
  TGuardian,
  TLocalGuardian,
  TStudent,
  TStudentModel,
  TUserName,
} from './student.interface';

const userNameSchema = new Schema<TUserName>(
  {
    firstName: {
      type: String,
      required: [true, 'First name is required'],
      trim: true,
      validate: {
        validator: function (fName: string) {
          const capitalized =
            fName.charAt(0).toLocaleUpperCase() + fName.slice(1);
          return fName === capitalized;
        },
        message: '{VALUE} is not in capitalize format',
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

const studentSchema = new Schema<TStudent, TStudentModel>(
  {
    id: {
      type: String,
      unique: [true, 'Student ID must be unique'],
    },
    user: {
      type: Schema.Types.ObjectId,
      required: [true, 'User is is required'],
      unique: true,
      ref: 'User',
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
      default: '',
    },
    admissionSemester: {
      type: Schema.Types.ObjectId,
      ref: 'AcademicSemester',
    },
    academicDepartment: {
      type: Schema.Types.ObjectId,
      ref: 'AcademicDepartment',
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
  { toJSON: { virtuals: true } },
);

//mongoose virtual
studentSchema.virtual('fullName').get(function () {
  return `${this.name.firstName} ${this.name?.middleName} ${this.name.lastName}`;
});

//query middleware to get only undeleated data
studentSchema.pre('find', function (next) {
  this.find({ isDeleted: { $ne: true } });
  next();
});

//aggregate middleware to protect deleted data
studentSchema.pre('aggregate', function (next) {
  this.pipeline().unshift({
    $match: { isDeleted: { $ne: true } },
  });
  next();
});

//custom static method
studentSchema.statics.isUserExists = async function (id: string) {
  const existingUser = await Student.findOne({ id });
  return existingUser;
};

export const Student = model<TStudent, TStudentModel>('Student', studentSchema);
