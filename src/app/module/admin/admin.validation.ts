import { z } from 'zod';
import { BloodGroup, Gender } from './admin.constants';

const createAdminNameValidationSchema = z.object({
  firstName: z
    .string()
    .trim()
    .min(2, 'First name must be at least 2 characters long')
    .max(10, 'First name cannot exceed 10 characters'),
  middleName: z
    .string()
    .trim()
    .max(50, 'Middle name cannot exceed 50 characters')
    .optional(),
  lastName: z
    .string()
    .trim()
    .min(2, 'Last name must be at least 2 characters long')
    .max(50, 'Last name cannot exceed 50 characters'),
});

const createAdminValidationSchema = z.object({
  body: z.object({
    password: z
      .string({
        invalid_type_error: 'Password must be string',
      })
      .optional(),
    admin: z.object({
      name: createAdminNameValidationSchema,
      gender: z.enum([...(Gender as [string, ...string[]])]),
      email: z.string().trim().email({ message: 'Invalid email format' }),
      dateOfBirth: z
        .string()
        .trim()
        .regex(/^\d{4}-\d{2}-\d{2}$/, {
          message: 'Date of Birth must be in YYYY-MM-DD format',
        })
        .optional(),
      contactNo: z
        .string()
        .trim()
        .regex(/^\d{10,15}$/, {
          message: 'Contact number must be between 10 to 15 digits',
        }),
      emergencyContactNo: z
        .string()
        .trim()
        .regex(/^\d{10,15}$/, {
          message: 'Emergency contact number must be between 10 to 15 digits',
        }),
      bloodGroup: z.enum([...(BloodGroup as [string, ...string[]])]).optional(),
      presentAddress: z.string().trim().min(5, {
        message: 'Present address must be at least 5 characters long',
      }),
      permanentAddress: z.string().trim().min(5, {
        message: 'Permanent address must be at least 5 characters long',
      }),
      profileImg: z
        .string()
        .trim()
        .url({ message: 'Invalid profile image URL' })
        .optional(),
    }),
  }),
});

//update validation
const updateAdminNameValidationSchema = z
  .object({
    firstName: z
      .string()
      .trim()
      .min(2, 'First name must be at least 2 characters long')
      .max(10, 'First name cannot exceed 10 characters')
      .optional(),
    middleName: z
      .string()
      .trim()
      .max(50, 'Middle name cannot exceed 50 characters')
      .optional(),
    lastName: z
      .string()
      .trim()
      .min(2, 'Last name must be at least 2 characters long')
      .max(50, 'Last name cannot exceed 50 characters')
      .optional(),
  })
  .optional();

const updateAdminValidationSchema = z.object({
  body: z.object({
    password: z
      .string({
        invalid_type_error: 'Password must be string',
      })
      .optional(),
    name: updateAdminNameValidationSchema,
    gender: z.enum([...(Gender as [string, ...string[]])]),
    email: z
      .string()
      .trim()
      .email({ message: 'Invalid email format' })
      .optional(),
    dateOfBirth: z
      .string()
      .trim()
      .regex(/^\d{4}-\d{2}-\d{2}$/, {
        message: 'Date of Birth must be in YYYY-MM-DD format',
      })
      .optional(),
    contactNo: z
      .string()
      .trim()
      .regex(/^\+880\d{9,12}$/, {
        message: 'Contact number must be between 10 to 15 digits',
      })
      .optional(),
    emergencyContactNo: z
      .string()
      .trim()
      .regex(/^\+880\d{9,12}$/, {
        message: 'Emergency contact number must be between 10 to 15 digits',
      })
      .optional(),
    bloodGroup: z.enum([...(BloodGroup as [string, ...string[]])]).optional(),
    presentAddress: z
      .string()
      .trim()
      .min(5, {
        message: 'Present address must be at least 5 characters long',
      })
      .optional(),
    permanentAddress: z
      .string()
      .trim()
      .min(5, {
        message: 'Permanent address must be at least 5 characters long',
      })
      .optional(),
    profileImg: z
      .string()
      .trim()
      .url({ message: 'Invalid profile image URL' })
      .optional(),
  }),
});

export const AdminValidationSchema = {
  createAdminValidationSchema,
  updateAdminValidationSchema,
};
