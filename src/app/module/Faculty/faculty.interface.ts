import { Types } from 'mongoose';

export type TFacultyName = {
  firstName: string;
  middleName: string;
  lastName: string;
};

export type TFaculty = {
  id: string;
  designation: string;
  name: TFacultyName;
  gender: 'male' | 'female';
  dateOfBirth: string;
  email: string;
  user: Types.ObjectId;
  contactNo: string;
  emergencyContactNo: string;
  presentAddress: string;
  permanentAddress: string;
  profileImage?: string;
  academicDepartment: Types.ObjectId;
  isDeleted: boolean;
};
