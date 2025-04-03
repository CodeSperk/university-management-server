import QueryBuilder from '../../builder/QueryBuilder';
import AppError from '../../error/AppError';
import { departmentSearchableFields } from './dept.constants';
import { TDepartment } from './dept.interface';
import { Department } from './dept.model';
import httpStatus from 'http-status';

const createDepartmentIntoDB = async (payload: TDepartment) => {
  const isDeparmentExists = await Department.findOne({ name: payload.name });
  if (isDeparmentExists) {
    throw new AppError(httpStatus.BAD_REQUEST, 'Department is already exists');
  }

  const result = await Department.create(payload);
  return result;
};

const getDepartmentsFromDB = async (query: Record<string, unknown>) => {
  const departmentsQuery = new QueryBuilder(Department.find(), query)
    .search(departmentSearchableFields)
    .filter()
    .sort()
    .paginate()
    .fields();

  const data = await departmentsQuery.modelQuery;
  const meta = await departmentsQuery.countTotal();

  return { meta, data };
};

const getDepartmentByIdFromDB = async (id: string) => {
  const result = await Department.findById(id).populate('academicFaculty');
  return result;
};

const updateDepartmentIntoDB = async (
  id: string,
  payload: Partial<TDepartment>,
) => {
  const result = await Department.findByIdAndUpdate(id, payload, {
    new: true,
  });
  return result;
};

export const DepartmentServices = {
  createDepartmentIntoDB,
  getDepartmentsFromDB,
  getDepartmentByIdFromDB,
  updateDepartmentIntoDB,
};
