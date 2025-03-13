import AppError from '../../error/AppError';
import { Department } from '../academicDepartment/dept.model';
import { Faculty } from '../academicFaculty/academicFaculty.model';
import { Course } from '../course/course.model';
import { FacultyMember } from '../FacultyMembers/faculty.model';
import { SemesterRegistration } from '../semesterRegistration/semesterRegistration.model';
import { TOfferedCourse } from './offeredCourse.interface';
import { OfferedCourse } from './offeredCourse.model';
import httpStatus from 'http-status';

const createOfferedCourseIntoDB = async (payload: TOfferedCourse) => {
  const {
    semesterRegistration,
    academicFaculty,
    academicDepartment,
    course,
    faculty,
  } = payload;
  //check if the semester registration is exists
  const isSemesterRegistrationExists =
    await SemesterRegistration.findById(semesterRegistration);
  if (!isSemesterRegistrationExists) {
    throw new AppError(
      httpStatus.NOT_FOUND,
      'Semester is not registered/ Invalid Semester Registration',
    );
  }

  //set academicSemester
  payload.academicSemester = isSemesterRegistrationExists?.academicSemester;

  //check if the academic Faculty exists
  const isAcademicFacultyExists = await Faculty.findById(academicFaculty);
  if (!isAcademicFacultyExists) {
    throw new AppError(httpStatus.NOT_FOUND, 'Academic Faculty is not found');
  }

  //check if the academic Department exists
  const isAcademicDepartmentExists =
    await Department.findById(academicDepartment);
  if (!isAcademicDepartmentExists) {
    throw new AppError(
      httpStatus.NOT_FOUND,
      'Academic Department is not found',
    );
  }

  //check if the academic Department exists
  const isCourseExists = await Course.findById(course);
  if (!isCourseExists) {
    throw new AppError(httpStatus.NOT_FOUND, 'Course is not found');
  }

  //check if the Faculty exists
  const isFacultyExists = await FacultyMember.findById(faculty);
  if (!isFacultyExists) {
    throw new AppError(httpStatus.NOT_FOUND, 'Faculty is not found');
  }

  const result = await OfferedCourse.create(payload);
  return result;
};

// const getOfferedCourseFromDB = async (query: Record<string, unknown>) => {
// const semesterRegistrationQuery = new QueryBuilder(
//   SemesterRegistration.find().populate('academicSemester'),
//   query,
// )
//   .filter()
//   .sort()
//   .paginate()
//   .fields();
// const result = await semesterRegistrationQuery.modelQuery;
// return result;
// };

// const getOfferedCourseByIdFromDB = async (id: string) => {
// const result = await SemesterRegistration.findById(id);
// return result;
// };

// const updateOfferedCourseIntoDB = async (
//   id: string,
//   payload: Partial<TSemesterRegistration>,
// ) => {
// //check if semister exists
// const isSemesterExists = await SemesterRegistration.findById(id);
// if (!isSemesterExists) {
//   throw new AppError(httpStatus.NOT_FOUND, 'Semester Is Not Found');
// }
// //check if the requested is ended
// const currentSemesterStatus = isSemesterExists.status;
// if (currentSemesterStatus === RegistrationStatus.ENDED) {
//   throw new AppError(
//     httpStatus.BAD_REQUEST,
//     `This  semester is already ${currentSemesterStatus}`,
//   );
// }
// //UPCOMMING ==> ONGOING ==> ENDED
// const requestedSemesterStatus = payload?.status;
// if (
//   currentSemesterStatus === RegistrationStatus.UPCOMMING &&
//   requestedSemesterStatus === RegistrationStatus.ENDED
// ) {
//   throw new AppError(
//     httpStatus.BAD_REQUEST,
//     `You can't update status from ${currentSemesterStatus} to ${requestedSemesterStatus}`,
//   );
// } else if (
//   currentSemesterStatus === RegistrationStatus.ONGOING &&
//   requestedSemesterStatus === RegistrationStatus.UPCOMMING
// ) {
//   throw new AppError(
//     httpStatus.BAD_REQUEST,
//     `You can't update status from ${currentSemesterStatus} to ${requestedSemesterStatus}`,
//   );
// }
// //now update
// const result = await SemesterRegistration.findByIdAndUpdate(id, payload, {
//   new: true,
//   runValidators: true,
// });
// return result;
// };

export const OfferedCourseServices = {
  createOfferedCourseIntoDB,
  // getOfferedCourseFromDB,
  // getOfferedCourseByIdFromDB,
  // updateOfferedCourseIntoDB,
};
