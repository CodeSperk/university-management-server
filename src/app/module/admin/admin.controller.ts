import AppError from '../../error/AppError';
import catchAsync from '../../utils/catchAsync';
import { AdminServices } from './admin.service';
import httpStatus from 'http-status';

const getAdmins = catchAsync(async (req, res) => {
  const result = await AdminServices.getAdminsFromDB(req.query);
  if (result.length < 1) {
    throw new AppError(httpStatus.NOT_FOUND, 'No admin Found');
  }
  res.status(200).json({
    success: true,
    message: 'Students',
    data: result,
  });
});

const getAdminById = catchAsync(async (req, res) => {
  const { adminId } = req.params;
  const result = await AdminServices.getAdminByIdFromDB(adminId);

  if (result === null) {
    throw new AppError(httpStatus.NOT_FOUND, 'Admin not Found');
  }

  res.status(200).json({
    success: true,
    message: 'Here is your admin',
    data: result,
  });
});

const updateAdmin = catchAsync(async (req, res) => {
  const { adminId } = req.params;
  const result = await AdminServices.updateAdminIntoDB(adminId, req.body);

  res.status(200).json({
    success: true,
    message: 'Admins is updated successfully',
    data: result,
  });
});

const deleteAdmin = catchAsync(async (req, res) => {
  const { adminId } = req.params;
  const result = await AdminServices.deleteAdminFromDB(adminId);

  res.status(200).json({
    success: true,
    message: 'Admin has been deleted successfully',
    data: result,
  });
});

export const AdminControllers = {
  getAdmins,
  getAdminById,
  deleteAdmin,
  updateAdmin,
};
