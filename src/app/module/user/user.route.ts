import express from 'express';
import { UserControllers } from './user.controller';
import validateRequest from '../../middleware/validateRequest';
import { StudentValidationSchema } from '../student/student.validation';
import { UserValidationSchema } from './user.validation';
import { FacultyMemberValidations } from '../FacultyMembers/fMember.validation';

const router = express.Router();

router.post(
  '/create-student',
  validateRequest(StudentValidationSchema.createStudentValidationSchema),
  validateRequest(UserValidationSchema.createUserValidationSchema),
  UserControllers.createStudent,
);

router.post(
  '/create-facultyMember',
  validateRequest(FacultyMemberValidations.createFacultyMemberSchema),
  validateRequest(UserValidationSchema.createUserValidationSchema),
  UserControllers.createFacultyMember,
);

export const UserRoutes = router;
