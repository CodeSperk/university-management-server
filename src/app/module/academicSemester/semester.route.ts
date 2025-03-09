import { Router } from 'express';
import { SemesterControllers } from './semester.controller';
import validateRequest from '../../middleware/validateRequest';
import { AcademicSemesterValidationSchema } from './semester.validation';

const router = Router();

router.use(
  '/create-semester',
  validateRequest(
    AcademicSemesterValidationSchema.createSemesterValidationSchema,
  ),
  SemesterControllers.createSemester,
);
router.use('/', SemesterControllers.getSemesters);
router.use('/:semesterId', SemesterControllers.getSemesterById);

export const SemesterRoutes = router;
