import catchAsync from '../../utils/catchAsync';
import { OfferedCourseServices } from './offeredCourse.service';

const createOfferedCourse = catchAsync(async (req, res) => {
  const result = await OfferedCourseServices.createOfferedCourseIntoDB(
    req.body,
  );
  res.status(200).json({
    success: true,
    message: 'Offered course created successfully',
    data: result,
  });
});

const getOfferedCourses = catchAsync(async (req, res) => {
  const result = await OfferedCourseServices.getOfferedCoursesFromDB(req.query);
  res.status(200).json({
    success: true,
    message: 'Here is your Offered Courses',
    data: result,
  });
});

const getOfferedCourseById = catchAsync(async (req, res) => {
  const { id } = req.params;
  const result = await OfferedCourseServices.getOfferedCourseByIdFromDB(id);
  res.status(200).json({
    success: true,
    message: 'Here is Your Offered Course',
    data: result,
  });
});

const updateOfferedCourse = catchAsync(async (req, res) => {
  const { id } = req.params;
  const result = await OfferedCourseServices.updateOfferedCourseIntoDB(
    id,
    req.body,
  );
  res.status(200).json({
    success: true,
    message: 'Updated successfull',
    data: result,
  });
});

export const OfferedCourseControllers = {
  createOfferedCourse,
  getOfferedCourses,
  getOfferedCourseById,
  updateOfferedCourse,
};
