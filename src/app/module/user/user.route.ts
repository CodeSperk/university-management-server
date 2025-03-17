import express from 'express';
import { UserControllers } from './user.controller';
import validateRequest from '../../middleware/validateRequest';
import { StudentValidationSchema } from '../student/student.validation';
import { UserValidationSchema } from './user.validation';
import { FacultyValidations } from '../Faculty/faculty.validation';
import { AdminValidationSchema } from '../admin/admin.validation';
import auth from '../../middleware/auth';
const router = express.Router();
import { USER_ROLE } from './user.constants';

router.post(
  '/create-student',
  auth(USER_ROLE.admin),
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

router.post(
  '/create-admin',
  validateRequest(AdminValidationSchema.createAdminValidationSchema),
  validateRequest(UserValidationSchema.createUserValidationSchema),
  UserControllers.createAdmin,
);

export const UserRoutes = router;
