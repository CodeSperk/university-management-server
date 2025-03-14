import { Router } from 'express';
import { FacultyControllers } from './faculty.controller';
import validateRequest from '../../middleware/validateRequest';
import { FacultyValidations } from './faculty.validation';

const router = Router();

router.get('/', FacultyControllers.getFaculties);
router.get('/:id', FacultyControllers.getFacultiesById);
router.patch(
  '/:id',
  validateRequest(FacultyValidations.updateFacultySchema),
  FacultyControllers.updateFacultyById,
);
router.delete('/:id', FacultyControllers.deleteFaculty);

export const FacultyRoutes = router;
