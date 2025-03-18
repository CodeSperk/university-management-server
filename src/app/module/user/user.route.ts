import express from 'express';
import { UserControllers } from './user.controller';
import validateRequest from '../../middleware/validateRequest';
import { StudentValidationSchema } from '../student/student.validation';
import { FacultyValidations } from '../Faculty/faculty.validation';
import { AdminValidationSchema } from '../admin/admin.validation';
import auth from '../../middleware/auth';
import { User_Role } from './user.constants';
const router = express.Router();

router.post(
  '/create-student',
  auth(User_Role.admin),
  validateRequest(StudentValidationSchema.createStudentValidationSchema),
  UserControllers.createStudent,
);

router.post(
  '/create-faculty',
  validateRequest(FacultyValidations.createFacultySchema),
  UserControllers.createFacultyMember,
);

router.post(
  '/create-admin',
  validateRequest(AdminValidationSchema.createAdminValidationSchema),
  UserControllers.createAdmin,
);

export const UserRoutes = router;
