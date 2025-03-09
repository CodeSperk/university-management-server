import catchAsync from '../../utils/catchAsync';
import { SemesterServices } from './semester.service';

const createSemester = catchAsync(async (req, res) => {
  const result = await SemesterServices.createSemesterIntoDB(req.body);
  res.status(200).json({
    success: true,
    message: 'Created Successfully',
    data: result,
  });
});

const getSemesters = catchAsync(async (req, res) => {
  const result = await SemesterServices.getSemestersFromDB();
  res.status(200).json({
    success: true,
    message: 'Here is your semesters',
    data: result,
  });
});

const getSemesterById = catchAsync(async (req, res) => {
  const { semesterId } = req.params;
  const result = await SemesterServices.getSemesterByIdFromDB(semesterId);
  res.status(200).json({
    success: true,
    message: 'Here is your semesters',
    data: result,
  });
});

export const SemesterControllers = {
  createSemester,
  getSemesters,
  getSemesterById,
};
