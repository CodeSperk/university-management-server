import express from 'express';
import { AcademicFacultyControllers } from './academicFaculty.controllers';
import validateRequest from '../../middleware/validateRequest';
import { AcademicFacultyValidations } from './academicFaculty.validation';
import auth from '../../middleware/auth';
import { USER_ROLE } from '../user/user.constants';

const router = express.Router();

router.post(
  '/create-faculty',
  auth(USER_ROLE.superAdmin, USER_ROLE.admin),
  validateRequest(
    AcademicFacultyValidations.createAcademicFacultyValidationSchema,
  ),
  AcademicFacultyControllers.createAcademicFaculty,
);
router.get('/', AcademicFacultyControllers.getAcademicFaculties);

router.get('/:facultyId', AcademicFacultyControllers.getAcademicFacultiyById);

router.patch(
  '/:facultyId',
  validateRequest(
    AcademicFacultyValidations.updateAcademicFacultyValidationSchema,
  ),
  AcademicFacultyControllers.updateAcademicFaculty,
);

export const AcademicFacultyRoutes = router;
