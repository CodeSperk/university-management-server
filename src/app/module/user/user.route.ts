import express from 'express';
import { UserControllers } from './user.controller';
import validateRequest from '../../middleware/validateRequest';
import { StudentValidationSchema } from '../student/student.validation';
import { UserValidationSchema } from './user.validation';
import { FacultyValidations } from '../FacultyMembers/faculty.validation';

const router = express.Router();

router.post(
  '/create-student',
  validateRequest(StudentValidationSchema.createStudentValidationSchema),
  validateRequest(UserValidationSchema.createUserValidationSchema),
  UserControllers.createStudent,
);

router.post(
  '/create-faculty',
  validateRequest(FacultyValidations.createFacultySchema),
  validateRequest(UserValidationSchema.createUserValidationSchema),
  UserControllers.createFacultyMember,
);

export const UserRoutes = router;
