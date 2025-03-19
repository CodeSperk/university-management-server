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

  const refreshToken = jwt.sign(
    jwtPayload,
    config.jwt_refresh_secret as string,
    { expiresIn: '30d' },
  );

  return {
    accessToken,
    refreshToken,
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
      passwordChangedAt: new Date(),
    },
  );

  return null;
};

const refreshToken = async (token: string) => {
  //check if the given token is valid
  const decoded = jwt.verify(
    token,
    config.jwt_refresh_secret as string,
  ) as JwtPayload;

  const { userId, iat } = decoded;

  //checking if the user exists
  const user = await User.isUserExistsByCustomId(userId);
  if (!user) {
    throw new AppError(httpStatus.NOT_FOUND, 'This user is not found');
  }

  //checking if user is already deleted
  if (user?.isDeleted) {
    throw new AppError(httpStatus.FORBIDDEN, 'This user is deleted !');
  }

  //checking if user is blocked
  if (user?.status === 'blocked') {
    throw new AppError(httpStatus.FORBIDDEN, 'This user is bloked');
  }

  //check if the user changed password after token issued
  if (
    user.passwordChangedAt &&
    User.isJWTIssuedBeforeChange(user.passwordChangedAt, iat as number)
  ) {
    throw new AppError(httpStatus.UNAUTHORIZED, 'You are not authorized');
  }

  const jwtPayload = {
    userId: user.id,
    role: user.role,
  };

  const accessToken = jwt.sign(jwtPayload, config.jwt_access_secret as string, {
    expiresIn: '365d',
  });

  return {
    accessToken,
  };
};

const forgetPassword = async (id: string) => {
  //check if the user exists
  const isUserExists = await User.isUserExistsByCustomId(id);
  if (!isUserExists) {
    throw new AppError(httpStatus.NOT_FOUND, 'User is not found');
  }

  //check if the user is deleted
  if (isUserExists.isDeleted) {
    throw new AppError(httpStatus.FORBIDDEN, 'User is deleted');
  }

  //check if the usuer is blocked
  if (isUserExists.status === 'blocked') {
    throw new AppError(httpStatus.FORBIDDEN, 'User is blocked');
  }

  //create token
  const jwtPayload = {
    userId: isUserExists.id,
    role: isUserExists.role,
  };

  const resetToken = jwt.sign(jwtPayload, config.jwt_access_secret as string, {
    expiresIn: '10m',
  });

  const resetUILink = `http://localhost:3000?id=${isUserExists.id}&token=${resetToken}`;

  console.log(resetUILink);
  return null;
};

export const AuthServices = {
  loginUser,
  changePasswordIntoDB,
  refreshToken,
  forgetPassword,
};
