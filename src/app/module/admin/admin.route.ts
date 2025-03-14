import express from 'express';
import { AdminControllers } from './admin.controller';
import validateRequest from '../../middleware/validateRequest';
import { AdminValidationSchema } from './admin.validation';

const router = express.Router();

router.get('/', AdminControllers.getAdmins);
router.get('/:adminId', AdminControllers.getAdminById);
router.delete('/:adminId', AdminControllers.deleteAdmin);
router.patch(
  '/:adminId',
  validateRequest(AdminValidationSchema.updateAdminValidationSchema),
  AdminControllers.updateAdmin,
);
export const AdminRoutes = router;
