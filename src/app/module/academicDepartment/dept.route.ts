import { Router } from 'express';
import { DepartmentControllers } from './dept.controllers';

const router = Router();

router.post('/create-department', DepartmentControllers.createDepartment);
router.get('/', DepartmentControllers.GetAllDepartments);
router.get('/:departmentId', DepartmentControllers.GetDepartmentById);
router.patch('/:departmentId', DepartmentControllers.UpdateDepartment);

export const DepartMentRoutes = router;
