import { Model } from 'mongoose';
import { User_Role } from './user.constants';

export interface TUser {
  id: string;
  password: string;
  needsPasswordChange: boolean;
  passwordChangedAt?: Date;
  role: 'admin' | 'faculty' | 'student';
  status: 'in-progress' | 'blocked';
  isDeleted: boolean;
}

export interface UserModel extends Model<TUser> {
  isUserExistsByCustomId(id: string): Promise<TUser>;

  isPasswordMatched(
    plainTextPassword: string,
    hashPassword: string,
  ): Promise<boolean>;

  isJWTIssuedBeforeChange(
    passwordChangedTimeStamp: Date,
    jwtIssuedTimeStamp: number,
  ): boolean;
}

export type TUserRole = keyof typeof User_Role;
