import catchAsync from '../../utils/catchAsync';
import sendResponse from '../../utils/sendResponse';
import { AcademicFacultyServices } from './academicFaculty.service';
import httpStatus from 'http-status';

const createAcademicFaculty = catchAsync(async (req, res) => {
  const faculty = req.body;

  const result =
    await AcademicFacultyServices.createAcademicFacultyIntoDB(faculty);

  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'Successful',
    data: result,
  });
});

const getAcademicFaculties = catchAsync(async (req, res) => {
  const result = await AcademicFacultyServices.getAcademicFacultiesFromDB(
    req.query,
  );

  res.status(httpStatus.OK).json({
    success: true,
    message: 'Successfully',
    meta: result.meta,
    data: result.data,
  });
});

const getAcademicFacultiyById = catchAsync(async (req, res) => {
  const { facultyId } = req.params;
  const result =
    await AcademicFacultyServices.getAcademicFacultyByIdFromDB(facultyId);

  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'Successful',
    data: result,
  });
});

const updateAcademicFaculty = catchAsync(async (req, res) => {
  const { facultyId } = req.params;
  const result = await AcademicFacultyServices.updateAcademicFacultyIntoDB(
    facultyId,
    req.body,
  );
  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'Successful',
    data: result,
  });
});

export const AcademicFacultyControllers = {
  createAcademicFaculty,
  getAcademicFaculties,
  getAcademicFacultiyById,
  updateAcademicFaculty,
};
