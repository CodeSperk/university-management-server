import { Router } from 'express';
import { CourseControllers } from './course.controller';
import validateRequest from '../../middleware/validateRequest';
import { CourseValidations } from './course.validation';

const router = Router();

router.post(
  '/create-course',
  validateRequest(CourseValidations.createCourseValidationSchema),
  CourseControllers.createCourse,
);

router.get('/', CourseControllers.getCourses);
router.get('/:courseId', CourseControllers.getCourseById);
router.patch(
  '/:courseId',
  validateRequest(CourseValidations.updateCourseValidationSchema),
  CourseControllers.updateCourse,
);
router.put(
  '/:courseId/assign-faculties',
  validateRequest(CourseValidations.facultyWithCourseValidationSchema),
  CourseControllers.assingFacultiesWithCourse,
);

router.delete(
  '/:courseId/remove-faculties',
  validateRequest(CourseValidations.facultyWithCourseValidationSchema),
  CourseControllers.removeFacultiesWithCourse,
);

router.delete('/:courseId', CourseControllers.deleteCourse);

export const CourseRoutes = router;
