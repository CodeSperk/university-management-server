/* eslint-disable @typescript-eslint/no-explicit-any */
import mongoose from 'mongoose';
import { Student } from './student.model';
import AppError from '../../error/AppError';
import httpStatus from 'http-status';
import { User } from '../user/user.model';
import { TStudent } from './student.interface';

const getStudentsFromDB = async (query: Record<string, unknown>) => {
  // {email : {$regex: query.searchTerm, $options: "i" }}
  // {presentAddress : {$regex: query.searchTerm, $options: "i" }}
  // {"name.firstName" : {$regex: query.searchTerm, $options: "i" }}
  //searching
  const queryObj = { ...query }; //copy of query

  //searching
  const studentSearchableFields = ['email', 'name.firstName', 'presentAddress'];

  let searchTerm = '';
  if (query?.searchTerm) {
    searchTerm = query?.searchTerm as string;
  }

  const searchQuery = Student.find({
    $or: studentSearchableFields.map((field) => ({
      [field]: { $regex: searchTerm, $options: 'i' },
    })),
  });

  //filtering
  const excludeFields = ['searchTerm', 'sort', 'limit', 'page', 'fields'];
  excludeFields.forEach((el) => delete queryObj[el]);

  console.log('base query: ', query, 'copied query : ', queryObj);

  const filterQuery = searchQuery
    .find(queryObj)
    .populate('user')
    .populate('admissionSemester')
    .populate({
      path: 'department',
      populate: {
        path: 'faculty',
      },
    });

  //sorting
  let sort = '-createdAt';
  console.log(query.sort);
  if (query.sort) {
    sort = (query?.sort as string)?.split(',').join(' ');
    console.log(sort);
  }

  const sortQuery = filterQuery.sort(sort);

  //limiting & pagination
  let limit = 10;
  let page = 1;
  let skip = 0;
  if (query?.limit) {
    limit = Number(query?.limit);
  }

  if (query?.page) {
    page = Number(query?.page);
    skip = (page - 1) * limit;
  }

  const paginateQuery = sortQuery.skip(skip);

  const limitQuery = paginateQuery.limit(limit);

  //field limiting
  let fields = '-__v'; //default to not selecting
  if (query?.fields) {
    //{fields: "name,email,id"}
    fields = (query?.fields as string)
      .split(',')
      .map((field) => field.trim())
      .join(' ');
  }
  const fieldQuery = await limitQuery.select(fields);
  return fieldQuery;
};

const getStudentByIdFromDB = async (id: string) => {
  const result = await Student.findOne({ id })
    .populate('user')
    .populate('admissionSemester')
    .populate({
      path: 'department',
      populate: {
        path: 'faculty',
      },
    });
  return result;
};

const updateStudentIntoDB = async (id: string, payload: Partial<TStudent>) => {
  const { name, guardian, localGuardian, ...remainingStudentData } = payload;

  const modifiedUpdatedData: Record<string> = { ...remainingStudentData };

  if (name && Object.keys(name).length) {
    for (const [key, value] of Object.entries(name)) {
      modifiedUpdatedData[`name${key}`] = value;
    }
  }
  if (guardian && Object.keys(guardian).length) {
    for (const [key, value] of Object.entries(guardian)) {
      modifiedUpdatedData[`guardian${key}`] = value;
    }
  }

  if (localGuardian && Object.keys(localGuardian).length) {
    for (const [key, value] of Object.entries(localGuardian)) {
      modifiedUpdatedData[`localGuardian${key}`] = value;
    }
  }
  console.log(modifiedUpdatedData);
  const result = await Student.findOneAndUpdate(
    {
      id,
    },
    modifiedUpdatedData,
    { new: true, runValidators: true },
  );

  return result;
};

const deleteStudentFromDB = async (id: string) => {
  const session = await mongoose.startSession();

  try {
    //start transaction
    session.startTransaction();

    //transaction -1
    const deletedStudent = await Student.findOneAndUpdate(
      { id },
      { isDeleted: true },
      {
        new: true,
        session,
      },
    );
    if (!deletedStudent) {
      throw new AppError(httpStatus.BAD_REQUEST, 'Failed to delete Student');
    }

    //transaction-2
    const deletedUser = await User.findOneAndUpdate(
      { id },
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
    return deletedStudent;
  } catch (error: any) {
    await session.abortTransaction();
    await session.endSession();
    throw new Error(error.message);
  }
};

export const StudentServices = {
  getStudentsFromDB,
  getStudentByIdFromDB,
  deleteStudentFromDB,
  updateStudentIntoDB,
};
