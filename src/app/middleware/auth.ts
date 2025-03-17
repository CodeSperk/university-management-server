import config from '../config';
import AppError from '../error/AppError';
import { TUserRole } from '../module/user/user.interface';
import catchAsync from '../utils/catchAsync';
import httpStatus from 'http-status';
import jwt, { JwtPayload } from 'jsonwebtoken';

const auth = (...requiredRoles: TUserRole[]) => {
  return catchAsync(async (req, res, next) => {
    const token = req.headers.authorization;

    //check if no token sent
    if (!token) {
      throw new AppError(httpStatus.UNAUTHORIZED, 'You are not authorized');
    }

    //check if the token is valid
    jwt.verify(
      token,
      config.jwt_access_secret as string,
      function (err, decoded) {
        if (err) {
          throw new AppError(httpStatus.UNAUTHORIZED, 'You are not authorized');
        }
        const role = (decoded as JwtPayload).data.role;
        if (requiredRoles && !requiredRoles.includes(role)) {
          throw new AppError(httpStatus.UNAUTHORIZED, 'You are not authorized');
        }
        req.user = decoded as JwtPayload;
        next();
      },
    );
  });
};

export default auth;
