import { Router } from 'express';
import { OfferedCourseControllers } from './offeredCourse.controller';

const router = Router();

router.post(
  '/create-offered-course',
  OfferedCourseControllers.createOfferedCourse,
);

export const OfferedCourseRoutes = router;
