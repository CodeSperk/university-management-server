import { TStudent } from './student.interface';
import { Student } from './student.model';

const createStudentIntoDB = async (student: TStudent) => {
  const result = await Student.create(student);
  return result;
};

const getStudentsFromDB = async () => {
  const result = await Student.find();
  return result;
};

export const StudentServices = {
  createStudentIntoDB,
  getStudentsFromDB,
};
