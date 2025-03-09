import { TDepartment } from './dept.interface';
import { Department } from './dept.model';

const createDepartmentIntoDB = async (payload: TDepartment) => {
  const result = await Department.create(payload);
  return result;
};

const getDepartmentsFromDB = async () => {
  const result = await Department.find().populate('faculty');
  return result;
};

const getDepartmentByIdFromDB = async (id: string) => {
  const result = await Department.findById(id).populate('faculty');
  return result;
};

const updateDepartmentIntoDB = async (
  id: string,
  payload: Partial<TDepartment>,
) => {
  const isDeptExists = await Department.findById(id);
  if (!isDeptExists) {
    throw new Error(`Department is not Found with the id  ${id}`);
  }
  const result = await Department.findByIdAndUpdate({ _id: id }, payload, {
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
