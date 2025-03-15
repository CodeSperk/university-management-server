/* eslint-disable @typescript-eslint/no-explicit-any */
import mongoose from 'mongoose';
import { User } from '../user/user.model';
import { TFaculty } from './faculty.interface';
import { Faculty } from './faculty.model';
import AppError from '../../error/AppError';
import httpStatus from 'http-status';

const getFacultiesFromDB = async () => {
  const result = await Faculty.find();
  return result;
};
const getFacultiesByIdFromDB = async (id: string) => {
  const result = await Faculty.findById(id);
  return result;
};

const updateFacultyIntoDB = async (id: string, payload: TFaculty) => {
  const { name, ...remainingFacultyData } = payload;

  const modifiedUpdatedData: Record<string, any> = { ...remainingFacultyData };

  if (name && Object.keys(name).length) {
    for (const [key, value] of Object.entries(name)) {
      modifiedUpdatedData[`name.${key}`] = value;
    }
  }
  const result = await Faculty.findByIdAndUpdate(
    id,
    {
      $set: modifiedUpdatedData,
    },
    {
      new: true,
      runValidators: true,
    },
  );

  return result;
};

const deleteFacultyFromDB = async (id: string) => {
  const session = await mongoose.startSession();
  try {
    //start transaction
    session.startTransaction();

    //delete faculty: transaction-1
    const deletedFaculty = await Faculty.findByIdAndUpdate(
      id,
      { isDeleted: true },
      { new: true, session },
    );
    if (!deletedFaculty) {
      throw new AppError(httpStatus.BAD_REQUEST, 'Failed to delete Faculty');
    }

    //delete user: transaction-2
    const userId = deletedFaculty?.user;
    const deleteUser = await User.findByIdAndUpdate(
      userId,
      { isDeleted: true },
      { new: true, session },
    );
    if (!deleteUser) {
      throw new AppError(httpStatus.BAD_REQUEST, 'Failed to delete User');
    }

    await session.commitTransaction();
    await session.endSession();
    return deletedFaculty;
  } catch {
    await session.abortTransaction();
    await session.endSession();
    throw new Error('User delete error');
  }
};

export const FacultyServices = {
  getFacultiesFromDB,
  getFacultiesByIdFromDB,
  updateFacultyIntoDB,
  deleteFacultyFromDB,
};
