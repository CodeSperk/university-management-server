import config from '../config';
import AppError from '../error/AppError';
import { TUserRole } from '../module/user/user.interface';
import catchAsync from '../utils/catchAsync';
import httpStatus from 'http-status';
import jwt, { JwtPayload } from 'jsonwebtoken';
import { User } from '../module/user/user.model';

const auth = (...requiredRole: TUserRole[]) => {
  return catchAsync(async (req, res, next) => {
    //check if no token sent from client
    const token = req.headers.authorization;
    if (!token) {
      throw new AppError(httpStatus.UNAUTHORIZED, 'You are not authorized');
    }

    //verify token
    const decoded = jwt.verify(token, config.jwt_access_secret as string);
    const { userId, role, iat } = decoded as JwtPayload;

    //check if the user is exists
    const user = await User.isUserExistsByCustomId(userId);
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

    //make token invalid if password changed after token issued
    const isPasswordChangeAfterTokenIssued =
      user.passwordChangedAt &&
      User.isJWTIssuedBeforeChange(user.passwordChangedAt, iat as number);
    if (isPasswordChangeAfterTokenIssued) {
      throw new AppError(httpStatus.UNAUTHORIZED, 'You are not authorized');
    }

    if (requiredRole && !requiredRole.includes(role)) {
      //check user role
      throw new AppError(httpStatus.UNAUTHORIZED, 'You are not authorized');
    }
    req.user = decoded as JwtPayload;
    next();
  });
};

export default auth;
