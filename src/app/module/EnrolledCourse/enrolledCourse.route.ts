import { Router } from 'express';
import validateRequest from '../../middleware/validateRequest';
import { EnrolledCourseValidations } from './enrolledCourse.validation';
import { EnrolledCourseControllesr } from './enrolledCourse.controller';
import auth from '../../middleware/auth';

const router = Router();

router.post(
  '/create-enrolled-course',
  auth('student'),
  validateRequest(
    EnrolledCourseValidations.createEnrolledCourseValidationZodSchema,
  ),
  EnrolledCourseControllesr.createEnrolledCourse,
);

export const EnrolledCourseRoutes = router;
