/* eslint-disable prettier/prettier */
import QueryBuilder from '../../builder/QueryBuilder';
import {
  SemerNameCodeMapper,
  semesterSearchableFields,
} from './semester.constants';
import { TAcademicSemester } from './semester.interface';
import { AcademicSemester } from './semester.model';

const createSemesterIntoDB = async (payload: TAcademicSemester) => {
  if (payload.code !== SemerNameCodeMapper[payload.name]) {
    throw new Error('Invalid Semester Code');
  }
  const result = await AcademicSemester.create(payload);
  return result;
};

const getSemestersFromDB = async (query: Record<string, unknown>) => {
  const semesterQuery = new QueryBuilder(AcademicSemester.find(), query)
    .search(semesterSearchableFields)
    .filter()
    .sort()
    .paginate()
    .fields();

  const result = await semesterQuery.modelQuery;
  const meta = await semesterQuery.countTotal();

  return { meta, result };
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
