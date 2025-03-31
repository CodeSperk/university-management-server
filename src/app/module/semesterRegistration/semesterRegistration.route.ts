import { Router } from 'express';
import { SemesterRegistrationControllers } from './semesterRegistration.controller';
import validateRequest from '../../middleware/validateRequest';
import { SemesterRegistrationValidations } from './semesterRegistration.validation';
import auth from '../../middleware/auth';
import { USER_ROLE } from '../user/user.constants';

const router = Router();

router.post(
  '/create-semesterRegistration',
  auth(USER_ROLE.superAdmin, USER_ROLE.admin),
  SemesterRegistrationControllers.createSemesterRegisration,
);

router.get('/', SemesterRegistrationControllers.getSemesterRegistrations);

router.get(
  '/:semesterRegistrationId',
  SemesterRegistrationControllers.getSemesterRegistrationById,
);

router.patch(
  '/:semesterRegistrationId',
  auth(USER_ROLE.superAdmin, USER_ROLE.admin),
  validateRequest(
    SemesterRegistrationValidations.updateSemesterRegisrationValidationSchema,
  ),
  SemesterRegistrationControllers.updateSemesterRegistrationById,
);

export const SemesterRegistrationRoutes = router;
