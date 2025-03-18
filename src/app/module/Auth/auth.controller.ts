import config from '../../config';
import catchAsync from '../../utils/catchAsync';
import { AuthServices } from './auth.service';

const loginUser = catchAsync(async (req, res) => {
  const result = await AuthServices.loginUser(req.body);
  const { refreshToken, accessToken, needsPasswordChange } = result;

  res.cookie('refreshToken', refreshToken, {
    secure: config.node_env === 'production',
    httpOnly: true,
  });
  console.log(refreshToken, accessToken);

  res.status(200).json({
    success: true,
    message: 'User Logged In successfully',
    data: { accessToken, needsPasswordChange },
  });
});

const changePassword = catchAsync(async (req, res) => {
  // console.log(req.user, req.body);
  //req.user is from token
  const result = await AuthServices.changePasswordIntoDB(req.user, req.body);

  res.status(200).json({
    success: true,
    message: 'Password Updated Successfully',
    data: result,
  });
});

export const AuthController = {
  loginUser,
  changePassword,
};
