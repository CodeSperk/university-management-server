/* eslint-disable @typescript-eslint/no-explicit-any */
import AppError from '../../error/AppError';
import { OfferedCourse } from '../OfferedCourse/offeredCourse.model';
import { TEnrolledCourse } from './enrolledCourse.interface';
import httpStatus from 'http-status';
import EnrolledCourse from './enrolledCourse.model';
import { Student } from '../student/student.model';
import mongoose from 'mongoose';
import { Course } from '../course/course.model';
import { SemesterRegistration } from '../semesterRegistration/semesterRegistration.model';

const createEnrolledCourseIntoDB = async (
  userId: string,
  payload: TEnrolledCourse,
) => {
  /***
   * validation steps
   * step-1 : check if the offered course is exists
   * step-2 : check offered course max capasity
   * step-3 : check if the student is already enrolled
   * step-4 : check total credit exceeds max credit
   * step-5 : create an enrolled course
   * step-6 : decrease offered course max capacity by 1
   */

  //check if the offered course is exists
  const isOfferedCourseExists = await OfferedCourse.findById(
    payload.offeredCourse,
  );
  if (!isOfferedCourseExists) {
    throw new AppError(
      httpStatus.BAD_REQUEST,
      'Your offered course is not found',
    );
  }

  //check if max capacity
  if (isOfferedCourseExists.maxCapacity <= 0) {
    throw new AppError(httpStatus.BAD_GATEWAY, 'Room is full');
  }

  // check if the student is already enrolled
  const student = await Student.findOne({ id: userId }, { _id: 1 });
  const isStudentAlreadyEnrolled = await EnrolledCourse.findOne({
    semesterRegistration: isOfferedCourseExists?.semesterRegistration,
    offeredCourse: payload.offeredCourse,
    student: student?._id,
  });
  if (isStudentAlreadyEnrolled) {
    throw new AppError(httpStatus.CONFLICT, 'Student is already enrolled');
  }

  //**check total credit exceeds max credit**//
  //get current course credit from course details
  const courseData = await Course.findById(isOfferedCourseExists.course).select(
    'credits',
  );
  const currentCredit = courseData?.credits;

  //get max credit from semester registration details
  const semesterRegistrationData = await SemesterRegistration.findById(
    isOfferedCourseExists.semesterRegistration,
  ).select('maxCreding');
  const maxCredit = semesterRegistrationData?.maxCreding;

  //get previous total of the enrolled courses details
  const enrolledCourses = await EnrolledCourse.aggregate([
    {
      $match: {
        semesterRegistration: isOfferedCourseExists.semesterRegistration,
        student: student?._id,
      },
    },
    {
      $lookup: {
        from: 'courses',
        localField: 'course',
        foreignField: '_id',
        as: 'enrolledCourseData',
      },
    },
    {
      $unwind: '$enrolledCourseData',
    },
    {
      $group: {
        _id: null,
        totalEnrolledCredits: { $sum: '$enrolledCourseData.credits' },
      },
    },
    {
      $project: {
        _id: 0,
        totalEnrolledCredits: 1,
      },
    },
  ]);
  const totalCredits =
    enrolledCourses.length > 0 ? enrolledCourses[0].totalEnrolledCredits : 0;

  //total enrolled credits + new enrolled course credits > maxCredit
  if (totalCredits && maxCredit && totalCredits + currentCredit > maxCredit) {
    throw new AppError(
      httpStatus.BAD_REQUEST,
      'You have exceeded maximum number of credits !',
    );
  }

  const session = await mongoose.startSession();
  try {
    session.startTransaction();

    //enroll now : transection-1
    const createEnrollment = await EnrolledCourse.create(
      [
        {
          semesterRegistration: isOfferedCourseExists?.semesterRegistration,
          academicSemester: isOfferedCourseExists?.academicSemester,
          academicFaculty: isOfferedCourseExists?.academicFaculty,
          academicDepartment: isOfferedCourseExists?.academicDepartment,
          offeredCourse: payload.offeredCourse,
          course: isOfferedCourseExists?.course,
          student: student?._id,
          isEnrolled: true,
          faculty: isOfferedCourseExists?.faculty,
        },
      ],
      { session },
    );

    if (!createEnrollment) {
      throw new AppError(
        httpStatus.BAD_REQUEST,
        'Failed to enroll in this course',
      );
    }

    //decrease offered course max capacity : transaction - 2
    const maxCapacity = isOfferedCourseExists.maxCapacity;
    const updatedCourseCapacity = await OfferedCourse.findByIdAndUpdate(
      payload.offeredCourse,
      {
        maxCapacity: maxCapacity - 1,
      },
      { session, new: true },
    );

    if (!updatedCourseCapacity) {
      throw new AppError(
        httpStatus.BAD_REQUEST,
        'Failed to update course capacity',
      );
    }

    await session.commitTransaction();
    await session.endSession();

    return createEnrollment;
  } catch (err: any) {
    if (session) {
      await session.abortTransaction();
      session.endSession();
    }
    throw err;
  }
};

export const EnrolledCourseServices = {
  createEnrolledCourseIntoDB,
};
