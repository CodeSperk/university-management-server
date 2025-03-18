import { Router } from 'express';
import { FacultyControllers } from './faculty.controller';
import validateRequest from '../../middleware/validateRequest';
import { FacultyValidations } from './faculty.validation';
import auth from '../../middleware/auth';
import { USER_ROLE } from '../user/user.constants';

const router = Router();

router.get(
  '/',
  auth(USER_ROLE.admin, USER_ROLE.faculty),
  FacultyControllers.getFaculties,
);

router.get('/:id', FacultyControllers.getFacultiesById);
router.patch(
  '/:id',
  validateRequest(FacultyValidations.updateFacultySchema),
  FacultyControllers.updateFacultyById,
);
router.delete('/:id', FacultyControllers.deleteFaculty);

export const FacultyRoutes = router;
