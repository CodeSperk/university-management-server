import config from '../../config';
import AppError from '../../error/AppError';
import { User } from '../user/user.model';
import { TLoginUser } from './auth.interface';
import httpStatus from 'http-status';
import jwt from 'jsonwebtoken';

const loginUser = async (payload: TLoginUser) => {
  //checking if the user is exists
  const existingUser = await User.isUserExistsByCustomId(payload.id);
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

export const AuthServices = {
  loginUser,
};
