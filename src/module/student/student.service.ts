import { TStudent } from './student.interface';
import { Student } from './student.model';

const createStudentIntoDB = async (payload: TStudent) => {
  if (await Student.isUserExists(payload.id)) {
    throw new Error('User is already exists');
  }
  const result = await Student.create(payload);

  // const student = new Student(payload);

  // if (await student.isUserExists(payload.id)) {
  //   throw new Error('User is already exists');
  // }
  // const result = await student.save();

  return result;
};

const getStudentsFromDB = async () => {
  const result = await Student.find();
  return result;
};

const getStudentByIdFromDB = async (id: string) => {
  const result = await Student.findById(id);
  return result;
};

export const StudentServices = {
  createStudentIntoDB,
  getStudentsFromDB,
  getStudentByIdFromDB,
};
