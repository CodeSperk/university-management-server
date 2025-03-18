/* eslint-disable @typescript-eslint/no-explicit-any */
import mongoose from 'mongoose';
import { AcademicSemester } from '../academicSemester/semester.model';
import { TStudent } from '../student/student.interface';
import { Student } from '../student/student.model';
import { TUser } from './user.interface';
import { User } from './user.model';
import AppError from '../../error/AppError';
import httpStatus from 'http-status';
import { TFaculty } from '../Faculty/faculty.interface';
import { Faculty } from '../Faculty/faculty.model';
import { idGenerator } from './user.utils';
import { Department } from '../academicDepartment/dept.model';
import { Admin } from '../admin/admin.model';
import { TAdmin } from '../admin/admin.interface';
import config from '../../config';
import { User_Role } from './user.constants';

const createStudentIntoDB = async (password: string, payload: TStudent) => {
  //Create UserData
  const userData: Partial<TUser> = {};

  //find current admissin semester
  const admissionSemester = await AcademicSemester.findById(
    payload.admissionSemester,
  );
  if (!admissionSemester) {
    throw new Error('Academic Semester not found');
  }

  userData.id = await idGenerator.generateStudentId(admissionSemester);

  userData.password = password || config.default_pass;
  userData.role = User_Role.student;

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

const createFacultyIntoDB = async (password: string, payload: TFaculty) => {
  //create user
  const userData: Partial<TUser> = {};

  userData.id = await idGenerator.generateFacultyMemberId();
  userData.password = password || config.default_pass;
  userData.role = 'faculty';

  //find Academic Departmet info
  const isDepartmentExist = await Department.findById(
    payload.academicDepartment,
  );
  if (!isDepartmentExist) {
    throw new AppError(400, 'Academic Department is not found');
  }

  //start-session
  const session = await mongoose.startSession();
  try {
    session.startTransaction();

    //create new User : transaction-1
    const newUser = await User.create([userData], { session });

    if (!newUser.length) {
      throw new AppError(httpStatus.BAD_REQUEST, 'Failed to create user');
    }

    //create new Faculty Member : Transaction-2
    const facultyMemberData = payload;
    facultyMemberData.id = newUser[0].id;
    facultyMemberData.user = newUser[0]._id;
    const newFacultyMember = await Faculty.create([facultyMemberData], {
      session,
    });

    if (!newFacultyMember.length) {
      throw new AppError(httpStatus.BAD_REQUEST, 'Failed to create student');
    }

    await session.commitTransaction();
    await session.endSession();

    return newFacultyMember;
  } catch (err: any) {
    await session.abortTransaction();
    await session.endSession();
    throw new Error(err.message);
  }
};

const createAdminIntoDB = async (password: string, payload: TAdmin) => {
  //create user
  const userData: Partial<TUser> = {};

  userData.id = await idGenerator.generateAdminId();
  userData.password = password || config.default_pass;
  userData.role = 'admin';

  //start-session
  const session = await mongoose.startSession();
  try {
    session.startTransaction();

    //create new User : transaction-1
    const newUser = await User.create([userData], { session });

    if (!newUser.length) {
      throw new AppError(httpStatus.BAD_REQUEST, 'Failed to create user');
    }

    //create new Admin : Transaction-2
    const adminData = payload;
    adminData.id = newUser[0].id;
    adminData.user = newUser[0]._id;

    const newAdmin = await Admin.create([adminData], {
      session,
    });

    if (!newAdmin.length) {
      throw new AppError(httpStatus.BAD_REQUEST, 'Failed to create admin');
    }

    await session.commitTransaction();
    await session.endSession();

    return newAdmin;
  } catch (err: any) {
    await session.abortTransaction();
    await session.endSession();
    throw new Error(err.message);
  }
};

export const UserServices = {
  createStudentIntoDB,
  createFacultyIntoDB,
  createAdminIntoDB,
};
