import express from 'express';
import { AcademicFacultyControllers } from './academicFaculty.controllers';
import validateRequest from '../../middleware/validateRequest';
import { AcademicFacultyValidations } from './academicFaculty.validation';

const router = express.Router();

router.post(
  '/create-faculty',
  validateRequest(AcademicFacultyValidations.createFacultyValidationSchema),
  AcademicFacultyControllers.createFaculty,
);
router.get('/', AcademicFacultyControllers.getAllFaculty);

router.get('/:facultyId', AcademicFacultyControllers.getFacultiesById);

router.patch(
  '/:facultyId',
  validateRequest(AcademicFacultyValidations.updateFacultyValidationSchema),
  AcademicFacultyControllers.updateFaculty,
);

export const AcademicFacultyRoutes = router;
