import { UserServices } from './user.service';
import sendResponse from '../../utils/sendResponse';
import httpStatus from 'http-status';
import catchAsync from '../../utils/catchAsync';

const createStudent = catchAsync(async (req, res) => {
  const result = await UserServices.createStudentIntoDB(req.file, req.body);

  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'Student is created successfully',
    data: result,
  });
});

const createFacultyMember = catchAsync(async (req, res) => {
  const result = await UserServices.createFacultyIntoDB(req.file, req.body);

  res.status(200).json({
    success: true,
    message: 'Faculty Member is created Successfylly',
    data: result,
  });
});

const createAdmin = catchAsync(async (req, res) => {
  const result = await UserServices.createAdminIntoDB(req.file, req.body);

  res.status(200).json({
    success: true,
    message: 'Admin is created Successfylly',
    data: result,
  });
});

const getMe = catchAsync(async (req, res) => {
  const { userId, role } = req.user;
  const result = await UserServices.getMeFromDB(userId, role);

  res.status(200).json({
    success: true,
    message: 'User retrived Successfylly',
    data: result,
  });
});

const changeUserStatus = catchAsync(async (req, res) => {
  const { id } = req.params;
  const result = await UserServices.changeUserStatusIntoDB(req.body, id);

  res.status(200).json({
    success: true,
    message: 'Status Updated successfully Successfylly',
    data: result,
  });
});

export const UserControllers = {
  createStudent,
  createFacultyMember,
  createAdmin,
  getMe,
  changeUserStatus,
};
