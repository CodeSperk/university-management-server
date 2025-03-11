import { Router } from 'express';
import { DepartmentControllers } from './dept.controllers';
import validateRequest from '../../middleware/validateRequest';
import { DepartmentValidation } from './dept.validation';

const router = Router();

router.post(
  '/create-department',
  validateRequest(DepartmentValidation.createStudentValidationSchema),
  DepartmentControllers.createDepartment,
);
router.get('/', DepartmentControllers.GetAllDepartments);
router.get('/:departmentId', DepartmentControllers.GetDepartmentById);
router.patch('/:departmentId', DepartmentControllers.UpdateDepartment);

export const DepartMentRoutes = router;
