import { TFaculty } from './faculty.interface';
import { Faculty } from './faculty.model';

const createFacultyIntoDB = async (payload: TFaculty) => {
  const result = await Faculty.create(payload);
  return result;
};

const getAllFacultiesFromDB = async () => {
  const result = await Faculty.find();
  return result;
};

const getFacultyByIdFromDB = async (id: string) => {
  const result = await Faculty.findById(id);
  return result;
};

const updateFacultyIntoDB = async (id: string, payload: Partial<TFaculty>) => {
  const result = await Faculty.findOneAndUpdate({ _id: id }, payload, {
    new: true,
  });
  return result;
};

export const FacultyServices = {
  createFacultyIntoDB,
  getAllFacultiesFromDB,
  getFacultyByIdFromDB,
  updateFacultyIntoDB,
};
