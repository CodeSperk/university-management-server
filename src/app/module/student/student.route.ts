import express from 'express';
import { StudentControllers } from './student.controller';
import validateRequest from '../../middleware/validateRequest';
import { StudentValidationSchema } from './student.validation';

const router = express.Router();

router.get('/', StudentControllers.getStudents);
router.get('/:studentId', StudentControllers.getStudentById);
router.delete('/:studentId', StudentControllers.deleteStudent);
router.patch(
  '/:studentId',
  validateRequest(StudentValidationSchema.updateStudentValidationSchema),
  StudentControllers.deleteStudent,
);
export const StudentRoutes = router;
