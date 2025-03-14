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
    section,
    days,
    startTime,
    endTime,
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

  //check if the departments is belongs to faculty
  if (
    isAcademicDepartmentExists.faculty.toString() !== academicFaculty.toString()
  ) {
    throw new AppError(
      httpStatus.NOT_FOUND,
      `${isAcademicDepartmentExists.name} Department is not belong to ${isAcademicFacultyExists.name}.`,
    );
  }

  //check if same offered course same section and same registered semester is already exists
  const isSameSectionWithSameOfferedCourse = await OfferedCourse.findOne({
    semesterRegistration,
    course,
    section,
  });
  if (isSameSectionWithSameOfferedCourse) {
    {
      throw new AppError(
        httpStatus.BAD_REQUEST,
        `Offered course with same section is already exists.`,
      );
    }
  }

  //get the Schedules of the faculties
  const assignedSchedules = await OfferedCourse.find({
    semesterRegistration,
    faculty,
    days: { $in: days },
  }).select('days startTime endTime');

  const newSchedule = {
    days,
    startTime,
    endTime,
  };

  assignedSchedules.forEach((schedule) => {
    const existingStartTime = new Date(`1970-01-01T${schedule.startTime}:00`);
    const existingEndTime = new Date(`1970-01-01T${schedule.endTime}:00`);
    const newStartTime = new Date(`1970-01-01T${newSchedule.startTime}:00`);
    const newEndTime = new Date(`1970-01-01T${newSchedule.endTime}:00`);

    if (newStartTime < existingEndTime && newEndTime > existingStartTime) {
      throw new AppError(
        httpStatus.CONFLICT,
        `This faculty is not available at that time ! chose different time or day`,
      );
    }
  });

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
