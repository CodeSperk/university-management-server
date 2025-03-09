/* eslint-disable @typescript-eslint/no-explicit-any */
import mongoose from 'mongoose';
import config from '../../config';
import { AcademicSemester } from '../academicSemester/semester.model';
import { TStudent } from '../student/student.interface';
import { Student } from '../student/student.model';
import { TUser } from './user.interface';
import { User } from './user.model';
import generateStudentId from './user.utils';
import AppError from '../../error/AppError';
import httpStatus from 'http-status';

const createStudentIntoDB = async (payload: TStudent) => {
  //Create UserData
  const userData: Partial<TUser> = {};

  //find current admissin semester
  const admissionSemester = await AcademicSemester.findById(
    payload.admissionSemester,
  );
  if (!admissionSemester) {
    throw new Error('Academic Semester not found');
  }

  const userId = await generateStudentId(admissionSemester);
  userData.id = userId;

  userData.password = payload.password || (config.default_pass as string);
  userData.role = 'student';

  //start session
  const session = await mongoose.startSession();
  try {
    //start transaction
    session.startTransaction();

    //create user : transaction-1
    const newUser = await User.create([userData], { session });

    if (!newUser.length) {
      throw new AppError(httpStatus.BAD_REQUEST, 'Failed to create user');
    }

    const studentData = payload;

    studentData.id = newUser[0].id;
    studentData.user = newUser[0]._id;

    //create student : transaction-2
    const newStudent = await Student.create([studentData], { session });
    if (!newStudent.length) {
      throw new AppError(httpStatus.BAD_REQUEST, 'Failed to create student');
    }

    await session.commitTransaction();
    await session.endSession();

    return newStudent;
  } catch (error: any) {
    await session.abortTransaction();
    await session.endSession();
    throw new Error(error.message);
  }
};

export const UserServices = {
  createStudentIntoDB,
};
