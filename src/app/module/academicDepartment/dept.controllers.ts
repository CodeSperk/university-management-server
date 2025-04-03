import catchAsync from '../../utils/catchAsync';
import sendResponse from '../../utils/sendResponse';
import httpStatus from 'http-status';
import { DepartmentServices } from './dept.service';

const createDepartment = catchAsync(async (req, res) => {
  const result = await DepartmentServices.createDepartmentIntoDB(req.body);

  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'Department has been created Successfully',
    data: result,
  });
});

const GetAllDepartments = catchAsync(async (req, res) => {
  const result = await DepartmentServices.getDepartmentsFromDB(req.query);

  res.status(200).json({
    success: true,
    message: 'Here is you all depertments',
    meta: result.meta,
    data: result.data,
  });
});

const GetDepartmentById = catchAsync(async (req, res) => {
  const { departmentId } = req.params;

  const result = await DepartmentServices.getDepartmentByIdFromDB(departmentId);
  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'Here is your department',
    data: result,
  });
});

const UpdateDepartment = catchAsync(async (req, res) => {
  const { departmentId } = req.params;

  const result = await DepartmentServices.updateDepartmentIntoDB(
    departmentId,
    req.body,
  );
  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'Department has been updated Successfully',
    data: result,
  });
});

export const DepartmentControllers = {
  createDepartment,
  GetAllDepartments,
  GetDepartmentById,
  UpdateDepartment,
};
