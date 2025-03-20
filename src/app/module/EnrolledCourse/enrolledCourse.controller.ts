import catchAsync from '../../utils/catchAsync';
import { EnrolledCourseServices } from './enrolledCourse.service';

const createEnrolledCourse = catchAsync(async (req, res) => {
  const { userId } = req.user;
  const result = await EnrolledCourseServices.createEnrolledCourseIntoDB(
    userId,
    req.body,
  );

  res.status(200).json({
    success: true,
    message: 'Enrolled Successfull',
    data: result,
  });
});

export const EnrolledCourseControllesr = {
  createEnrolledCourse,
};
