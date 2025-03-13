import { Router } from 'express';
import { SemesterRegistrationControllers } from './semesterRegistration.controller';
import validateRequest from '../../middleware/validateRequest';
import { SemesterRegistrationValidations } from './semesterRegistration.validation';

const router = Router();

router.post(
  '/create-semesterRegistration',
  SemesterRegistrationControllers.createSemesterRegisration,
);
router.get('/', SemesterRegistrationControllers.getSemesterRegistrations);

router.get(
  '/:semesterRegistrationId',
  SemesterRegistrationControllers.getSemesterRegistrationById,
);

router.patch(
  '/:semesterRegistrationId',
  validateRequest(
    SemesterRegistrationValidations.updateSemesterRegisrationValidationSchema,
  ),
  SemesterRegistrationControllers.updateSemesterRegistrationById,
);

export const SemesterRegistrationRoutes = router;
