import config from '../../config';
import AppError from '../../error/AppError';
import { User } from '../user/user.model';
import { TLoginUser } from './auth.interface';
import httpStatus from 'http-status';
import jwt, { JwtPayload } from 'jsonwebtoken';
import bcrypt from 'bcrypt';

const loginUser = async (payload: TLoginUser) => {
  //checking if the user is exists
  const user = await User.isUserExistsByCustomId(payload.id);
  if (!user) {
    throw new AppError(httpStatus.NOT_FOUND, 'User is not found');
  }

  //check if the user is already deleted
  if (user?.isDeleted) {
    throw new AppError(httpStatus.FORBIDDEN, 'This user is deleted');
  }

  // //check if the user is blocked
  if (user?.status === 'blocked') {
    throw new AppError(httpStatus.FORBIDDEN, 'This user has been blocked');
  }
  //check if the password is matched
  const isPasswordMatched = await User.isPasswordMatched(
    payload.password,
    user?.password,
  );
  if (!isPasswordMatched) {
    throw new AppError(httpStatus.BAD_REQUEST, 'Wrong Password');
  }

  // create token and sent to the client
  const jwtPayload = {
    userId: user.id,
    role: user.role,
  };

  const accessToken = jwt.sign(
    {
      data: jwtPayload,
    },
    config.jwt_access_secret as string,
    { expiresIn: '10d' },
  );

  return {
    accessToken,
    needsPasswordChange: user?.needsPasswordChange,
  };
};

const changePasswordIntoDB = async (
  userData: JwtPayload,
  payload: { oldPassword: string; newPassword: string },
) => {
  //checking if the user is exists
  const user = await User.isUserExistsByCustomId(userData.data.userId);
  if (!user) {
    throw new AppError(httpStatus.NOT_FOUND, 'User is not found');
  }

  //check if the user is already deleted
  if (user?.isDeleted) {
    throw new AppError(httpStatus.FORBIDDEN, 'This user is deleted');
  }

  // //check if the user is blocked
  if (user?.status === 'blocked') {
    throw new AppError(httpStatus.FORBIDDEN, 'This user has been blocked');
  }

  //check if the password is matched
  const isPasswordMatched = await User.isPasswordMatched(
    payload.oldPassword,
    user?.password,
  );
  if (!isPasswordMatched) {
    throw new AppError(httpStatus.BAD_REQUEST, 'Old password is wrong');
  }

  //hash new password
  const newHashedPassword = await bcrypt.hash(
    payload.newPassword,
    Number(config.bcrypt_salt_round),
  );

  //update new password
  await User.findOneAndUpdate(
    {
      id: userData.data.userId,
      role: userData.data.role,
    },
    {
      password: newHashedPassword,
      needsPasswordChange: false,
      passwordChangedAt: new Date(),
    },
  );

  return null;
};

export const AuthServices = {
  loginUser,
  changePasswordIntoDB,
};
