import { Types } from 'mongoose';

export type TFacultyMemberName = {
  firstName: string;
  middleName: string;
  lastName: string;
};

export type TFacultyMember = {
  id: string;
  designation: string;
  name: TFacultyMemberName;
  gender: 'male' | 'female';
  dateOfBirth: string;
  email: string;
  password: string;
  user: Types.ObjectId;
  contactNo: string;
  emergencyContactNo: string;
  presentAddress: string;
  permanentAddress: string;
  profileImage?: string;
  academicFaculty: string;
  academicDepartment: string;
  isDeleted: boolean;
};
