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

// const getOfferedCourses = catchAsync(async (req, res) => {
// const result =
//   await SemesterRegistrationServices.getSemesterRegistrationsFromDB(
//     req.query,
//   );
// res.status(200).json({
//   success: true,
//   message: 'Here are Registered Semesters',
//   data: result,
// });
// });

// const getOfferedCourseById = catchAsync(async (req, res) => {
// const { semesterRegistrationId } = req.params;
// const result =
//   await SemesterRegistrationServices.getSemesterRegistrationByIdFromDB(
//     semesterRegistrationId,
//   );
// res.status(200).json({
//   success: true,
//   message: 'Here is Registered Semesters',
//   data: result,
// });
// });

// const updateOfferedCourse = catchAsync(async (req, res) => {
// const { semesterRegistrationId } = req.params;
// const result =
//   await SemesterRegistrationServices.updateSemesterRegisrationIntoDB(
//     semesterRegistrationId,
//     req.body,
//   );
// res.status(200).json({
//   success: true,
//   message: 'Here is Registered Semesters',
//   data: result,
// });
// });

export const OfferedCourseControllers = {
  createOfferedCourse,
  // getOfferedCourses,
  // getOfferedCourseById,
  // updateOfferedCourse,
};
