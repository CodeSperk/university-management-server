import { UserServices } from './user.service';
import sendResponse from '../../utils/sendResponse';
import httpStatus from 'http-status';
import catchAsync from '../../utils/catchAsync';

const createStudent = catchAsync(async (req, res) => {
  const studentData = req.body;

  const result = await UserServices.createStudentIntoDB(studentData);

  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'Student is created successfully',
    data: result,
  });
});

const createFacultyMember = catchAsync(async (req, res) => {
  const facultyMemberData = req.body;

  const result =
    await UserServices.createFacultyMemberIntoDB(facultyMemberData);

  res.status(200).json({
    success: true,
    message: 'Faculty Member is created Successfylly',
    data: result,
  });
});

const createAdmin = catchAsync(async (req, res) => {
  const adminData = req.body;

  const result = await UserServices.createAdminIntoDB(adminData);

  res.status(200).json({
    success: true,
    message: 'Admin is created Successfylly',
    data: result,
  });
});

export const UserControllers = {
  createStudent,
  createFacultyMember,
  createAdmin,
};
