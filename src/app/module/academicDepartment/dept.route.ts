import { Router } from 'express';
import { DepartmentControllers } from './dept.controllers';
import validateRequest from '../../middleware/validateRequest';
import { DepartmentValidation } from './dept.validation';
import auth from '../../middleware/auth';
import { USER_ROLE } from '../user/user.constants';

const router = Router();

router.post(
  '/create-department',
  auth(USER_ROLE.superAdmin, USER_ROLE.admin),
  validateRequest(DepartmentValidation.createStudentValidationSchema),
  DepartmentControllers.createDepartment,
);
router.get('/', DepartmentControllers.GetAllDepartments);
router.get('/:departmentId', DepartmentControllers.GetDepartmentById);
router.patch('/:departmentId', DepartmentControllers.UpdateDepartment);

export const DepartMentRoutes = router;
