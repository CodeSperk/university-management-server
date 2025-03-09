import express from 'express';
import { FacultyControllers } from './faculty.controllers';
import validateRequest from '../../middleware/validateRequest';
import { FacultyValidation } from './faculty.validation';

const router = express.Router();

router.post(
  '/create-faculty',
  validateRequest(FacultyValidation.createFacultyValidationSchema),
  FacultyControllers.createFaculty,
);
router.get('/', FacultyControllers.getAllFaculty);

router.get('/:facultyId', FacultyControllers.getFacultiesById);

router.patch(
  '/:facultyId',
  validateRequest(FacultyValidation.updateFacultyValidationSchema),
  FacultyControllers.updateFaculty,
);

export const FacultyRoutes = router;
