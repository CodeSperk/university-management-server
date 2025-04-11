import catchAsync from '../../utils/catchAsync';
import { SemesterRegistrationServices } from './semesterRegistration.service';

const createSemesterRegisration = catchAsync(async (req, res) => {
  const result =
    await SemesterRegistrationServices.createSemesterRegisrationIntoDB(
      req.body,
    );

  res.status(200).json({
    success: true,
    message: 'Semester has been created successfullyy',
    data: result,
  });
});

const getSemesterRegistrations = catchAsync(async (req, res) => {
  const result =
    await SemesterRegistrationServices.getSemesterRegistrationsFromDB(
      req.query,
    );

  res.status(200).json({
    success: true,
    message: 'Here are Registered Semesters',
    meta: result.meta,
    data: result.data,
  });
});

const getSemesterRegistrationById = catchAsync(async (req, res) => {
  const { semesterRegistrationId } = req.params;

  const result =
    await SemesterRegistrationServices.getSemesterRegistrationByIdFromDB(
      semesterRegistrationId,
    );

  res.status(200).json({
    success: true,
    message: 'Here is Registered Semesters',
    data: result,
  });
});

const updateSemesterRegistrationById = catchAsync(async (req, res) => {
  const { semesterRegistrationId } = req.params;

  const result =
    await SemesterRegistrationServices.updateSemesterRegisrationIntoDB(
      semesterRegistrationId,
      req.body,
    );

  res.status(200).json({
    success: true,
    message: 'Here is Registered Semesters',
    data: result,
  });
});

export const SemesterRegistrationControllers = {
  createSemesterRegisration,
  getSemesterRegistrations,
  getSemesterRegistrationById,
  updateSemesterRegistrationById,
};
