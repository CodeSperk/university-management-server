import config from '../../config';
import AppError from '../../error/AppError';
import { User } from '../user/user.model';
import { TChangePassword, TLoginUser } from './auth.interface';
import httpStatus from 'http-status';
import jwt, { JwtPayload } from 'jsonwebtoken';
import bcrypt from 'bcrypt';

const loginUser = async (payload: TLoginUser) => {
  //checking if the user is exists
  const existingUser = await User.isUserExistsByCustomId(payload.id);
  console.log(existingUser);
  if (!existingUser) {
    throw new AppError(httpStatus.NOT_FOUND, 'User is not found');
  }

  //check if the user is already deleted
  if (existingUser?.isDeleted) {
    throw new AppError(httpStatus.FORBIDDEN, 'This user is deleted');
  }

  // //check if the user is blocked
  if (existingUser?.status === 'blocked') {
    throw new AppError(httpStatus.FORBIDDEN, 'This user has been blocked');
  }

  // //check if the password is matched
  const isPasswordMatched = await User.isPasswordMatched(
    payload.password,
    existingUser?.password,
  );
  if (!isPasswordMatched) {
    throw new AppError(httpStatus.BAD_REQUEST, 'Wrong Password');
  }

  const jwtPayload = {
    userId: existingUser.id,
    role: existingUser.role,
  };

  const accessToken = jwt.sign(jwtPayload, config.jwt_access_secret as string, {
    expiresIn: '1d',
  });

  return {
    accessToken,
    needsPasswordChange: existingUser?.needsPasswordChange,
  };
};

const changePasswordIntoDB = async (
  payload: TChangePassword,
  userData: JwtPayload,
) => {
  //check if the user is exist
  const isUserExists = await User.isUserExistsByCustomId(userData.userId);
  if (!isUserExists) {
    throw new AppError(httpStatus.NOT_FOUND, 'User not found');
  }

  //check if the user is deleted
  if (isUserExists.isDeleted) {
    throw new AppError(httpStatus.FORBIDDEN, 'User is deleted');
  }
  //check if the user is blocked
  if (isUserExists.status === 'blocked') {
    throw new AppError(httpStatus.FORBIDDEN, 'User is blocked');
  }

  //check if the user password is matched
  const isPassMatched = await User.isPasswordMatched(
    payload.oldPassword,
    isUserExists?.password,
  );
  if (!isPassMatched) {
    throw new AppError(httpStatus.BAD_REQUEST, 'Your old password is wrong');
  }

  //make new password hashed
  const newHashedPassword = await bcrypt.hash(
    payload.newPassword,
    Number(config.bcrypt_salt_round),
  );

  //update new password
  await User.findOneAndUpdate(
    {
      id: userData.userId,
      role: userData.role,
    },
    {
      password: newHashedPassword,
      needsPasswordChange: true,
    },
  );

  return null;
};

export const AuthServices = {
  loginUser,
  changePasswordIntoDB,
};
