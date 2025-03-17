import { Schema, model } from 'mongoose';
import { TUser, UserModel } from './user.interface';
import bcrypt from 'bcrypt';
import config from '../../config';

const userSchema = new Schema<TUser, UserModel>(
  {
    id: { type: String, required: true },
    password: {
      type: String,
      required: true,
      select: 0,
    },
    needsPasswordChange: { type: Boolean, default: true },
    passwordChangedAt: {
      type: Date,
    },
    role: {
      type: String,
      enum: ['admin', 'faculty', 'student'],
    },
    status: {
      type: String,
      enum: ['in-progress', 'blocked'],
      default: 'in-progress',
    },
    isDeleted: {
      type: Boolean,
      default: false,
    },
  },
  {
    timestamps: true, //for createdAT and UpdatedAt
  },
);

//Pre Middlewar: encript password using bcrypt
userSchema.pre('save', async function (next) {
  // eslint-disable-next-line @typescript-eslint/no-this-alias
  const user = this;
  user.password = await bcrypt.hash(
    user.password,
    Number(config.bcrypt_salt_round),
  );
  next();
});

//post middleware to make encrypted password empty
userSchema.post('save', function (doc, next) {
  doc.password = '';
  next();
});

//statistics method user check
userSchema.statics.isUserExistsByCustomId = async function (id: string) {
  return await User.findOne({ id }).select('+password');
};

//Statistic method to match password
userSchema.statics.isPasswordMatched = async function (
  plainTextPassword,
  hashPassword,
) {
  return await bcrypt.compare(plainTextPassword, hashPassword);
};

export const User = model<TUser, UserModel>('User', userSchema);
