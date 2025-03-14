import { TAcademicSemester } from '../academicSemester/semester.interface';
import { User } from './user.model';

const findLastStudentId = async () => {
  const lastStudent = await User.findOne(
    {
      role: 'student',
    },
    {
      id: 1,
      _id: 0,
    },
  )
    .sort({ createdAt: -1 })
    .lean();
  return lastStudent?.id ? lastStudent.id : undefined;
};

const generateStudentId = async (payload: TAcademicSemester) => {
  if (!payload.year || !payload.code) {
    throw new Error('Missing required academic semester details (year/code)');
  }

  let currentId = (0).toString();

  //find matching year & semister last student id
  const lastStudentId = await findLastStudentId();
  const lastSemesterYear = lastStudentId?.substring(0, 4);
  const lastSemesterCode = lastStudentId?.substring(4, 6);

  const currentSemesterYear = payload.year;
  const currentSemesterCode = payload.code;

  if (
    lastStudentId &&
    lastSemesterCode === currentSemesterCode &&
    lastSemesterYear === currentSemesterYear
  ) {
    currentId = lastStudentId.substring(6);
  }

  let incrementId = (Number(currentId) + 1).toString().padStart(4, '0');

  incrementId = `${payload.year}${payload.code}${incrementId}`;

  return incrementId;
};

//find last user id;
const findLastUserId = async (role: string) => {
  const lastUser = await User.findOne({ role: role }, { id: 1, _id: 0 })
    .sort({ createdAt: -1 })
    .lean();
  return lastUser?.id?.slice(2) || '0000';
};

const generateFacultyMemberId = async () => {
  const currentId = (await findLastUserId('faculty')) || '0';
  let incrementId = (Number(currentId) + 1).toString().padStart(4, '0');
  incrementId = `F-${incrementId}`;

  return incrementId;
};

const generateAdminId = async () => {
  const currentId = (await findLastUserId('admin')) || '0000';
  const numericId = Number(currentId);
  let incrementId = (numericId + 1).toString().padStart(4, '0');
  incrementId = `A-${incrementId}`;
  return incrementId;
};

export const idGenerator = {
  generateStudentId,
  generateFacultyMemberId,
  generateAdminId,
};
