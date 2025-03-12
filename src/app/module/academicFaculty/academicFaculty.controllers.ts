import catchAsync from '../../utils/catchAsync';
import sendResponse from '../../utils/sendResponse';
import { FacultyServices } from './academicFaculty.service';
import httpStatus from 'http-status';

const createFaculty = catchAsync(async (req, res) => {
  const faculty = req.body;

  const result = await FacultyServices.createFacultyIntoDB(faculty);

  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'Successful',
    data: result,
  });
});

const getAllFaculty = catchAsync(async (req, res) => {
  const result = await FacultyServices.getAllFacultiesFromDB();

  res.status(httpStatus.OK).json({
    success: true,
    message: 'Successfully',
    data: result,
  });
});

const getFacultiesById = catchAsync(async (req, res) => {
  const { facultyId } = req.params;
  const result = await FacultyServices.getFacultyByIdFromDB(facultyId);

  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'Successful',
    data: result,
  });
});

const updateFaculty = catchAsync(async (req, res) => {
  const { facultyId } = req.params;
  const result = await FacultyServices.updateFacultyIntoDB(facultyId, req.body);
  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'Successful',
    data: result,
  });
});

export const AcademicFacultyControllers = {
  createFaculty,
  getAllFaculty,
  getFacultiesById,
  updateFaculty,
};
