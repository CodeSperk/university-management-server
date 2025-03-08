import config from '../../config';
import { TStudent } from '../student/student.interface';
import { Student } from '../student/student.model';
import { TUser } from './user.interface';
import { User } from './user.model';

const createStudentIntoDB = async (password: string, payload: TStudent) => {
  //Create UserData
  const userData: Partial<TUser> = {};
  userData.id = '2030010002';
  userData.password = password || (config.default_pass as string);
  userData.role = 'student';

  const newUser = await User.create(userData);

  //create student
  const studentData = payload;
  if (Object.keys(newUser).length) {
    studentData.id = newUser.id;
    studentData.user = newUser._id;

    const newStudent = await Student.create(studentData);
    return newStudent;
  }
};

export const UserServices = {
  createStudentIntoDB,
};
