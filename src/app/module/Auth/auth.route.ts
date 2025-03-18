import { Router } from 'express';
import validateRequest from '../../middleware/validateRequest';
import { AuthValidation } from './auth.validation';
import { AuthController } from './auth.controller';
import auth from '../../middleware/auth';
const router = Router();

router.post(
  '/login',
  auth(),
  validateRequest(AuthValidation.loginValidationSchema),
  AuthController.loginUser,
);

export const AuthRoutes = router;
