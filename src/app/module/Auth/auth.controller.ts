import catchAsync from '../../utils/catchAsync';
import { AuthServices } from './auth.service';

const loginUser = catchAsync(async (req, res) => {
  const result = await AuthServices.loginUser(req.body);

  res.status(200).json({
    success: true,
    message: 'User Logged In successfully',
    data: result,
  });
});

const changePassword = catchAsync(async (req, res) => {
  const result = await AuthServices.changePasswordIntoDB(req.body, req.user);

  res.status(200).json({
    success: true,
    message: 'Password changed successfully',
    data: result,
  });
});

export const AuthController = {
  loginUser,
  changePassword,
};
