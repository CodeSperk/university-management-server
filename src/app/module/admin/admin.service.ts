/* eslint-disable @typescript-eslint/no-explicit-any */
import mongoose from 'mongoose';
import QueryBuilder from '../../builder/QueryBuilder';
import { adminSearchableFields } from './admin.constants';
import { Admin } from './admin.model';
import AppError from '../../error/AppError';
import httpStatus from 'http-status';
import { User } from '../user/user.model';
import { TAdmin } from './admin.interface';

const getAdminsFromDB = async (query: Record<string, unknown>) => {
  const AdminQuery = new QueryBuilder(Admin.find().populate('user'), query)
    .search(adminSearchableFields)
    .filter()
    .sort()
    .paginate()
    .fields();

  const result = await AdminQuery.modelQuery;

  return result;
};

const getAdminByIdFromDB = async (id: string) => {
  const result = await Admin.findById(id).populate('user');
  return result;
};

const updateAdminIntoDB = async (id: string, payload: Partial<TAdmin>) => {
  const { name, ...remainingAdminData } = payload;

  const modifiedUpdatedData: Record<string, any> = { ...remainingAdminData };

  if (name && Object.keys(name).length) {
    for (const [key, value] of Object.entries(name)) {
      modifiedUpdatedData[`name.${key}`] = value;
    }
  }
  const result = await Admin.findByIdAndUpdate(
    id,
    { $set: modifiedUpdatedData },
    { new: true, runValidators: true },
  );

  return result;
};

const deleteAdminFromDB = async (id: string) => {
  const session = await mongoose.startSession();

  try {
    //start transaction
    session.startTransaction();

    //transaction -1
    const deletedAdmin = await Admin.findByIdAndUpdate(
      id,
      { isDeleted: true },
      {
        new: true,
        session,
      },
    );
    if (!deletedAdmin) {
      throw new AppError(httpStatus.BAD_REQUEST, 'Failed to delete Admin');
    }

    //transaction-2
    const deletedUser = await User.findByIdAndUpdate(
      deletedAdmin.user,
      {
        isDeleted: true,
      },
      {
        new: true,
        session,
      },
    );
    if (!deletedUser) {
      throw new AppError(httpStatus.BAD_REQUEST, 'Failed to delete User');
    }

    await session.commitTransaction();
    await session.endSession();
    return deletedAdmin;
  } catch (error: any) {
    await session.abortTransaction();
    await session.endSession();
    throw new Error(error.message);
  }
};

export const AdminServices = {
  getAdminsFromDB,
  getAdminByIdFromDB,
  deleteAdminFromDB,
  updateAdminIntoDB,
};
