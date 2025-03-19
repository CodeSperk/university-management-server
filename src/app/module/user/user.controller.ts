import { UserServices } from './user.service';
import sendResponse from '../../utils/sendResponse';
import httpStatus from 'http-status';
import catchAsync from '../../utils/catchAsync';
import AppError from '../../error/AppError';

const createStudent = catchAsync(async (req, res) => {
  const result = await UserServices.createStudentIntoDB(req.body);

  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'Student is created successfully',
    data: result,
  });
});

const createFacultyMember = catchAsync(async (req, res) => {
  const result = await UserServices.createFacultyIntoDB(req.body);

  res.status(200).json({
    success: true,
    message: 'Faculty Member is created Successfylly',
    data: result,
  });
});

const createAdmin = catchAsync(async (req, res) => {
  const result = await UserServices.createAdminIntoDB(req.body);

  res.status(200).json({
    success: true,
    message: 'Admin is created Successfylly',
    data: result,
  });
});

const getMe = catchAsync(async (req, res) => {
  const token = req.headers.authorization;
  if (!token) {
    throw new AppError(httpStatus.UNAUTHORIZED, 'You are not authorized');
  }
  const result = await UserServices.getMeFromDB(token);

  res.status(200).json({
    success: true,
    message: 'User retrived Successfylly',
    data: result,
  });
});

export const UserControllers = {
  createStudent,
  createFacultyMember,
  createAdmin,
  getMe,
};
