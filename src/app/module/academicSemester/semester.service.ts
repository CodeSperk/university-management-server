import { SemerNameCodeMapper } from './semester.constants';
import { TAcademicSemester } from './semester.interface';
import { AcademicSemester } from './semester.model';

const createSemesterIntoDB = async (payload: TAcademicSemester) => {
  if (payload.code !== SemerNameCodeMapper[payload.name]) {
    throw new Error('Invalid Semester Code');
  }
  const result = await AcademicSemester.create(payload);
  return result;
};

const getSemestersFromDB = async () => {
  const result = await AcademicSemester.find();
  return result;
};

const getSemesterByIdFromDB = async (id: string) => {
  const result = await AcademicSemester.findById(id);
  return result;
};

export const SemesterServices = {
  createSemesterIntoDB,
  getSemestersFromDB,
  getSemesterByIdFromDB,
};
