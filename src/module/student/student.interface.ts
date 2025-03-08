import { Model } from 'mongoose';

export type TUserName = {
  firstName: string;
  middleName?: string;
  lastName: string;
};

export type TGuardian = {
  fatherName: string;
  fatherOccupation: string;
  fatherContactNo: string;
  motherName: string;
  motherOccupation: string;
  motherContactNo: string;
};

export type TLocalGuardian = {
  name: string;
  occupation: string;
  contactName: string;
  address: string;
};

export type TStudent = {
  id: string;
  name: TUserName;
  gender: 'male' | 'female';
  email: string;
  dateOfBirth?: string;
  contactNo: string;
  emergencyContactNo: string;
  bloodGroup?: 'A+' | 'A-' | 'B+' | 'B-' | 'O+' | 'O-' | 'AB+' | 'AB-';
  presentAddress: string;
  permanentAddress: string;
  guardian: TGuardian;
  localGuardian: TLocalGuardian;
  profileImg?: string;
  isActive: 'active' | 'blocked';
};

//Static method type
export interface TStudentMethods extends Model<TStudent> {
  isUserExists(id: string): Promise<TStudent | null>;
}

// //custom instance method
// export type TStudentMethods = {
//   isUserExists(id: string): Promise<TStudent | null>;
// };

// //create student model type
// export type TStudentModel = Model<
//   TStudent,
//   Record<string, never>,
//   TStudentMethods
// >;
