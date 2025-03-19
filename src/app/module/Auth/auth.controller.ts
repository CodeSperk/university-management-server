import config from '../../config';
import catchAsync from '../../utils/catchAsync';
import { AuthServices } from './auth.service';

const loginUser = catchAsync(async (req, res) => {
  const result = await AuthServices.loginUser(req.body);

  const { accessToken, refreshToken, needsPasswordChange } = result;
  res.cookie('refreshToken', refreshToken, {
    secure: config.node_env === 'production',
    httpOnly: true,
  });
  res.status(200).json({
    success: true,
    message: 'User Logged In successfully',
    data: { accessToken, needsPasswordChange },
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

const refreshToken = catchAsync(async (req, res) => {
  const { refreshToken } = req.cookies;
  const result = await AuthServices.refreshToken(refreshToken);

  res.status(200).json({
    success: true,
    message: 'Access token is retrived successfully',
    data: result,
  });
});
const forgetPassword = catchAsync(async (req, res) => {
  const userId = req.body.id;
  const result = await AuthServices.forgetPassword(userId);

  res.status(200).json({
    success: true,
    message: 'Resel Link generated successfully',
    data: result,
  });
});

const resetPassword = catchAsync(async (req, res) => {
  const token = req.headers.authorization;
  const result = await AuthServices.resetPasswordIntoDB(req.body, token);

  res.status(200).json({
    success: true,
    message: 'Password reset successfully',
    data: result,
  });
});

export const AuthController = {
  loginUser,
  changePassword,
  refreshToken,
  forgetPassword,
  resetPassword,
};
