import { model, Schema } from 'mongoose';
import { AdminModel, TAdmin, TAdminName } from './admin.interface';
import { BloodGroup, Gender } from './admin.constants';

const adminNameSchema = new Schema<TAdminName>(
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

const adminSchema = new Schema<TAdmin, AdminModel>(
  {
    id: {
      type: String,
      unique: [true, 'Admin ID must be unique'],
    },
    user: {
      type: Schema.Types.ObjectId,
      required: [true, 'User is is required'],
      unique: true,
      ref: 'User',
    },
    name: {
      type: adminNameSchema,
      required: [true, 'Name is required'],
    },
    gender: {
      type: String,
      enum: {
        values: Gender,
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
        values: BloodGroup,
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
    profileImg: {
      type: String,
      default: '',
    },
    isDeleted: {
      type: Boolean,
      default: false,
    },
  },
  { timestamps: true, toJSON: { virtuals: true } },
);

//to get fullName
adminSchema.virtual('fullName').get(function () {
  const result = `${this.name.firstName} ${this.name?.middleName ? this.name.middleName + ' ' : ''}${this.name.lastName}`;
  return result;
});

// filter out deleted documents
adminSchema.pre('find', function (next) {
  this.find({ isDeleted: { $ne: true } });
  next();
});

adminSchema.pre('findOne', function (next) {
  this.find({ isDeleted: { $ne: true } });
  next();
});

adminSchema.pre('aggregate', function (next) {
  this.pipeline().unshift({ $match: { isDeleted: { $ne: true } } });
  next();
});

//checking if user is already exist!
adminSchema.statics.isUserExists = async function (id: string) {
  const existingUser = await Admin.findOne({ id });
  return existingUser;
};

export const Admin = model<TAdmin, AdminModel>('Admin', adminSchema);
