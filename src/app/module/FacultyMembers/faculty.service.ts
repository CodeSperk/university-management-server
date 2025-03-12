/* eslint-disable @typescript-eslint/no-explicit-any */
import mongoose from 'mongoose';
import { User } from '../user/user.model';
import { TFacultyMember } from './faculty.interface';
import { FacultyMember } from './faculty.model';
import AppError from '../../error/AppError';
import httpStatus from 'http-status';

const getFacultiesFromDB = async () => {
  const result = await FacultyMember.find();
  return result;
};
const getFacultiesByIdFromDB = async (id: string) => {
  const result = await FacultyMember.findOne({ id });
  return result;
};

const updateFacultyIntoDB = async (id: string, payload: TFacultyMember) => {
  const { name, ...remainingFacultyData } = payload;

  const modifiedUpdatedData: Record<string, any> = { ...remainingFacultyData };

  if (name && Object.keys(name).length) {
    for (const [key, value] of Object.entries(name)) {
      modifiedUpdatedData[`name.${key}`] = value;
    }
  }
  const result = await FacultyMember.findOneAndUpdate(
    { id: id },
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

    //delete user: transaction-1
    const deleteUser = await User.findOneAndUpdate(
      { id: id },
      { isDeleted: true },
      { new: true, session },
    );
    if (!deleteUser) {
      throw new AppError(httpStatus.BAD_REQUEST, 'Failed to delete User');
    }

    //delete faculty: transaction-2
    const deletedFaculty = await FacultyMember.findOneAndUpdate(
      { id: id },
      { isDeleted: true },
      { new: true, session },
    );
    if (!deletedFaculty) {
      throw new AppError(httpStatus.BAD_REQUEST, 'Failed to delete Faculty');
    }

    await session.commitTransaction();
    await session.endSession();
    return deletedFaculty;
  } catch (err) {
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
