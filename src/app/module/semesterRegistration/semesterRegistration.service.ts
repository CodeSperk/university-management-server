import AppError from '../../error/AppError';
import { AcademicSemester } from '../academicSemester/semester.model';
import httpStatus from 'http-status';
import { SemesterRegistration } from './semesterRegistration.model';
import { TSemesterRegistration } from './semesterRegistration.interface';
import QueryBuilder from '../../builder/QueryBuilder';
import { RegistrationStatus } from './semesterRegistration.constants';

const createSemesterRegisrationIntoDB = async (
  payload: TSemesterRegistration,
) => {
  const academicSemester = payload.academicSemester;

  //check if there any registered semester that is already 'UPCOMMING' OR 'ONGOING'
  const isAnyUpcommingOrOngoingSemester = await SemesterRegistration.findOne({
    $and: [
      { status: RegistrationStatus.UPCOMMING },
      { status: RegistrationStatus.ONGOING },
    ],
  });
  if (isAnyUpcommingOrOngoingSemester) {
    throw new AppError(
      httpStatus.NOT_FOUND,
      `There is already an registered semester`,
    );
  }

  //check if semister exists
  const isSemesterExists = await AcademicSemester.findById(academicSemester);
  if (!isSemesterExists) {
    throw new AppError(httpStatus.NOT_FOUND, 'Semester Is Not exists');
  }

  //check if semester is already registerd
  const isSemesterRegistered = await SemesterRegistration.findOne({
    academicSemester,
  });
  if (isSemesterRegistered) {
    throw new AppError(httpStatus.NOT_FOUND, 'Semester is already registered');
  }

  const result = await SemesterRegistration.create(payload);
  return result;
};

const getSemesterRegistrationsFromDB = async (
  query: Record<string, unknown>,
) => {
  const semesterRegistrationQuery = new QueryBuilder(
    SemesterRegistration.find().populate('academicSemester'),
    query,
  )
    .filter()
    .sort()
    .paginate()
    .fields();

  const result = await semesterRegistrationQuery.modelQuery;
  return result;
};

const getSemesterRegistrationByIdFromDB = async (id: string) => {
  const result = await SemesterRegistration.findById(id);
  return result;
};

const updateSemesterRegisrationIntoDB = async (
  id: string,
  payload: Partial<TSemesterRegistration>,
) => {
  //check if semister exists
  const isSemesterExists = await SemesterRegistration.findById(id);
  if (!isSemesterExists) {
    throw new AppError(httpStatus.NOT_FOUND, 'Semester Is Not Found');
  }

  //check if the requested is ended
  const currentSemesterStatus = isSemesterExists.status;
  if (currentSemesterStatus === RegistrationStatus.ENDED) {
    throw new AppError(
      httpStatus.BAD_REQUEST,
      `This  semester is already ${currentSemesterStatus}`,
    );
  }

  //UPCOMMING ==> ONGOING ==> ENDED
  const requestedSemesterStatus = payload?.status;
  if (
    currentSemesterStatus === RegistrationStatus.UPCOMMING &&
    requestedSemesterStatus === RegistrationStatus.ENDED
  ) {
    throw new AppError(
      httpStatus.BAD_REQUEST,
      `You can't update status from ${currentSemesterStatus} to ${requestedSemesterStatus}`,
    );
  } else if (
    currentSemesterStatus === RegistrationStatus.ONGOING &&
    requestedSemesterStatus === RegistrationStatus.UPCOMMING
  ) {
    throw new AppError(
      httpStatus.BAD_REQUEST,
      `You can't update status from ${currentSemesterStatus} to ${requestedSemesterStatus}`,
    );
  }

  //now update
  const result = await SemesterRegistration.findByIdAndUpdate(id, payload, {
    new: true,
    runValidators: true,
  });

  return result;
};

export const SemesterRegistrationServices = {
  createSemesterRegisrationIntoDB,
  getSemesterRegistrationsFromDB,
  getSemesterRegistrationByIdFromDB,
  updateSemesterRegisrationIntoDB,
};
