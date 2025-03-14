import { Router } from 'express';
import { OfferedCourseControllers } from './offeredCourse.controller';
import validateRequest from '../../middleware/validateRequest';
import { OfferedCourseValidationSchema } from './offeredCourse.validation';

const router = Router();

router.post(
  '/create-offered-course',
  validateRequest(
    OfferedCourseValidationSchema.createOfferedCourseValidationSchema,
  ),
  OfferedCourseControllers.createOfferedCourse,
);

export const OfferedCourseRoutes = router;
