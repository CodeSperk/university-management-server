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
import { sendImgToCloudinary } from '../../utils/sendImgToCloudinary';

const createStudentIntoDB = async (file: any, payload: TStudent) => {
  //Create UserData
  const userData: Partial<TUser> = {};

  //find current admissin semester
  const admissionSemester = await AcademicSemester.findById(
    payload.admissionSemester,
  );
  if (!admissionSemester) {
    throw new Error('Academic Semester not found');
  }

  // find department
  const academicDepartment = await Department.findById(
    payload.academicDepartment,
  );

  if (!academicDepartment) {
    throw new AppError(400, 'Aademic department not found');
  }
  payload.academicFaculty = academicDepartment.academicFaculty;

  userData.id = await idGenerator.generateStudentId(admissionSemester);

  userData.password = config.default_pass;
  userData.role = 'student';
  userData.email = payload.email;

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

    if (file) {
      const imgName = `${payload.name.firstName}-${userData.id}`;

      const profileImage = await sendImgToCloudinary(imgName, file.path);
      studentData.profileImg = profileImage.secure_url;
    }

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

const createFacultyIntoDB = async (file: any, payload: TFaculty) => {
  //create user
  const userData: Partial<TUser> = {};

  userData.id = await idGenerator.generateFacultyMemberId();
  userData.password = config.default_pass;
  userData.role = 'faculty';
  userData.email = payload.email;

  //find Academic Departmet info
  const isDepartmentExist = await Department.findById(
    payload.academicDepartment,
  );
  if (!isDepartmentExist) {
    throw new AppError(400, 'Academic Department is not found');
  }

  payload.academicFaculty = isDepartmentExist.academicFaculty;

  //start-session
  const session = await mongoose.startSession();
  try {
    session.startTransaction();

    //create new User : transaction-1
    const newUser = await User.create([userData], { session });

    if (!newUser.length) {
      throw new AppError(httpStatus.BAD_REQUEST, 'Failed to create user');
    }

    //to upload image
    const facultyMemberData = payload;
    if (file) {
      const imgName = `${payload.name.firstName}-${userData.id}`;
      const profileImage = await sendImgToCloudinary(imgName, file.path);
      facultyMemberData.profileImage = profileImage.source_url;
    }

    //create new Faculty Member : Transaction-2
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

const createAdminIntoDB = async (file: any, payload: TAdmin) => {
  //create user
  const userData: Partial<TUser> = {};

  userData.id = await idGenerator.generateAdminId();
  userData.password = config.default_pass;
  userData.role = 'admin';
  userData.email = payload.email;

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
    if (file) {
      // to upload image
      const imgName = `${payload.name.firstName}-${userData.id}`;
      const profileImage = await sendImgToCloudinary(imgName, file.path);
      adminData.profileImg = profileImage.secure_url;
    }

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

const getMeFromDB = async (userId: string, role: string) => {
  let result = null;
  if (role === 'student') {
    result = await Student.findOne({ id: userId })
      .populate('user')
      .populate('admissionSemester')
      .populate({
        path: 'department',
        populate: {
          path: 'academicFaculty',
        },
      });
  }
  if (role === 'faculty') {
    result = await Faculty.findOne({ id: userId }).populate('user');
  }
  if (role === 'admin') {
    result = await Admin.findOne({ id: userId }).populate('user');
  }

  return result;
};

const changeUserStatusIntoDB = async (
  payload: { status: string },
  id: string,
) => {
  const result = await User.findByIdAndUpdate(id, payload, { new: true });

  return result;
};

export const UserServices = {
  createStudentIntoDB,
  createFacultyIntoDB,
  createAdminIntoDB,
  getMeFromDB,
  changeUserStatusIntoDB,
};
