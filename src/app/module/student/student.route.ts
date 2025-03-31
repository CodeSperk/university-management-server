import express from 'express';
import { StudentControllers } from './student.controller';
import validateRequest from '../../middleware/validateRequest';
import { StudentValidationSchema } from './student.validation';
import auth from '../../middleware/auth';
import { USER_ROLE } from '../user/user.constants';

const router = express.Router();

router.get(
  '/',
  auth(USER_ROLE.superAdmin, USER_ROLE.admin, USER_ROLE.faculty),
  StudentControllers.getStudents,
);
router.get(
  '/:studentId',
  auth(USER_ROLE.superAdmin, USER_ROLE.admin, USER_ROLE.faculty),
  StudentControllers.getStudentById,
);
router.delete(
  '/:studentId',
  auth(USER_ROLE.superAdmin, USER_ROLE.admin, USER_ROLE.faculty),
  StudentControllers.deleteStudent,
);
router.patch(
  '/:studentId',
  validateRequest(StudentValidationSchema.updateStudentValidationSchema),
  StudentControllers.updateStudent,
);
export const StudentRoutes = router;
