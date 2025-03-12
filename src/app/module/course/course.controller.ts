import catchAsync from '../../utils/catchAsync';
import { CourseServices } from './course.service';

const createCourse = catchAsync(async (req, res) => {
  const result = await CourseServices.createCourseIntoDB(req.body);

  res.status(200).json({
    success: true,
    message: 'Course is created Successfully',
    data: result,
  });
});

const getCourses = catchAsync(async (req, res) => {
  const result = await CourseServices.getCoursesFromDB(req.query);
  res.status(200).json({
    success: true,
    message: 'Courses are retrived Successfully',
    data: result,
  });
});

const getCourseById = catchAsync(async (req, res) => {
  const { courseId } = req.params;
  const result = await CourseServices.getCourseByIdFromDB(courseId);

  res.status(200).json({
    success: true,
    message: 'Course is retrived Successfully',
    data: result,
  });
});

const updateCourse = catchAsync(async (req, res) => {
  const { courseId } = req.params;
  const result = await CourseServices.updateCourseIntoDB(courseId, req.body);
  res.status(200).json({
    success: true,
    message: 'Course is updated Successfully',
    data: result,
  });
});

const deleteCourse = catchAsync(async (req, res) => {
  const { courseId } = req.params;
  const result = await CourseServices.deleteCourseFromDB(courseId);

  res.status(200).json({
    success: true,
    message: 'Course is deleted Successfully',
    data: result,
  });
});

export const CourseControllers = {
  createCourse,
  getCourses,
  getCourseById,
  deleteCourse,
  updateCourse,
};
