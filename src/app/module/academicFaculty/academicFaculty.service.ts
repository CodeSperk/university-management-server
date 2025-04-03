import AppError from '../../error/AppError';
import { TAcademicFaculty } from './academicFaculty.interface';
import { AcademicFaculty } from './academicFaculty.model';
import httpStatus from 'http-status';

const createAcademicFacultyIntoDB = async (payload: TAcademicFaculty) => {
  //isAlready Exists
  const faculty = await AcademicFaculty.findOne({ name: payload.name });

  if (faculty) {
    throw new AppError(httpStatus.BAD_REQUEST, 'Faculty is already Exists');
  }

  const result = await AcademicFaculty.create(payload);
  return result;
};

const getAcademicFacultiesFromDB = async () => {
  const result = await AcademicFaculty.find();
  return result;
};

const getAcademicFacultyByIdFromDB = async (id: string) => {
  const result = await AcademicFaculty.findById(id);
  return result;
};

const updateAcademicFacultyIntoDB = async (
  id: string,
  payload: Partial<TAcademicFaculty>,
) => {
  const result = await AcademicFaculty.findByIdAndUpdate(id, payload, {
    new: true,
  });
  return result;
};

export const AcademicFacultyServices = {
  createAcademicFacultyIntoDB,
  getAcademicFacultiesFromDB,
  getAcademicFacultyByIdFromDB,
  updateAcademicFacultyIntoDB,
};
