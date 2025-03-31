import { Router } from 'express';
import { SemesterControllers } from './semester.controller';
import validateRequest from '../../middleware/validateRequest';
import { AcademicSemesterValidationSchema } from './semester.validation';
import { USER_ROLE } from '../user/user.constants';
import auth from '../../middleware/auth';

const router = Router();

router.post(
  '/create-semester',
  auth(USER_ROLE.superAdmin, USER_ROLE.admin),
  validateRequest(
    AcademicSemesterValidationSchema.createSemesterValidationSchema,
  ),
  SemesterControllers.createSemester,
);
router.get('/', auth(USER_ROLE.admin), SemesterControllers.getSemesters);
router.get('/:semesterId', SemesterControllers.getSemesterById);

export const SemesterRoutes = router;
