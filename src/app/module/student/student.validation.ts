import { z } from 'zod';

const createUserNameValidationSchema = z.object({
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

const createGuardianValidationSchema = z.object({
  fatherName: z
    .string()
    .trim()
    .min(2, 'Father name must be at least 2 characters long'),
  fatherOccupation: z
    .string()
    .trim()
    .min(2, 'Father occupation must be at least 2 characters long'),
  fatherContactNo: z
    .string()
    .trim()
    .regex(
      /^\d{10,15}$/,
      'Father contact number must be between 10 to 15 digits',
    ),
  motherName: z
    .string()
    .trim()
    .min(2, 'Mother name must be at least 2 characters long'),
  motherOccupation: z
    .string()
    .trim()
    .min(2, 'Mother occupation must be at least 2 characters long'),
  motherContactNo: z
    .string()
    .trim()
    .regex(
      /^\d{10,15}$/,
      'Mother contact number must be between 10 to 15 digits',
    ),
});

const createLocalGuardianValidationSchema = z.object({
  name: z
    .string()
    .trim()
    .min(2, "Local guardian's name must be at least 2 characters long"),
  occupation: z
    .string()
    .trim()
    .min(2, "Local guardian's occupation must be at least 2 characters long"),
  contactName: z
    .string()
    .trim()
    .regex(
      /^\d{10,15}$/,
      'Local guardian contact number must be between 10 to 15 digits',
    ),
  address: z
    .string()
    .trim()
    .min(5, "Local guardian's address must be at least 5 characters long"),
});

const createStudentValidationSchema = z.object({
  body: z.object({
    password: z.string({
      invalid_type_error: 'Password must be string',
    }),
    name: createUserNameValidationSchema,
    gender: z.enum(['male', 'female'], {
      message: 'Gender must be either male or female',
    }),
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
    bloodGroup: z
      .enum(['A+', 'A-', 'B+', 'B-', 'O+', 'O-', 'AB+', 'AB-'])
      .optional(),
    presentAddress: z.string().trim().min(5, {
      message: 'Present address must be at least 5 characters long',
    }),
    permanentAddress: z.string().trim().min(5, {
      message: 'Permanent address must be at least 5 characters long',
    }),
    guardian: createGuardianValidationSchema,
    localGuardian: createLocalGuardianValidationSchema,
    profileImg: z
      .string()
      .trim()
      .url({ message: 'Invalid profile image URL' })
      .optional(),
    admissionSemester: z.string(),
    department: z.string(),
    idDeleted: z.boolean().default(false),
  }),
});

//update validation
const updateUserNameValidationSchema = z
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

const updateGuardianValidationSchema = z
  .object({
    fatherName: z
      .string()
      .trim()
      .min(2, 'Father name must be at least 2 characters long')
      .optional(),
    fatherOccupation: z
      .string()
      .trim()
      .min(2, 'Father occupation must be at least 2 characters long')
      .optional(),
    fatherContactNo: z
      .string()
      .trim()
      .regex(
        /^\d{10,15}$/,
        'Father contact number must be between 10 to 15 digits',
      )
      .optional(),
    motherName: z
      .string()
      .trim()
      .min(2, 'Mother name must be at least 2 characters long')
      .optional(),
    motherOccupation: z
      .string()
      .trim()
      .min(2, 'Mother occupation must be at least 2 characters long')
      .optional(),
    motherContactNo: z
      .string()
      .trim()
      .regex(
        /^\d{10,15}$/,
        'Mother contact number must be between 10 to 15 digits',
      )
      .optional(),
  })
  .optional();

const updateLocalGuardianValidationSchema = z
  .object({
    name: z
      .string()
      .trim()
      .min(2, "Local guardian's name must be at least 2 characters long")
      .optional(),
    occupation: z
      .string()
      .trim()
      .min(2, "Local guardian's occupation must be at least 2 characters long")
      .optional(),
    contactName: z
      .string()
      .trim()
      .regex(
        /^\d{10,15}$/,
        'Local guardian contact number must be between 10 to 15 digits',
      )
      .optional(),
    address: z
      .string()
      .trim()
      .min(5, "Local guardian's address must be at least 5 characters long")
      .optional(),
  })
  .optional();

const updateStudentValidationSchema = z.object({
  body: z.object({
    password: z
      .string({
        invalid_type_error: 'Password must be string',
      })
      .optional(),
    name: updateUserNameValidationSchema,
    gender: z
      .enum(['male', 'female'], {
        message: 'Gender must be either male or female',
      })
      .optional(),
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
      .regex(/^\d{10,15}$/, {
        message: 'Contact number must be between 10 to 15 digits',
      })
      .optional(),
    emergencyContactNo: z
      .string()
      .trim()
      .regex(/^\d{10,15}$/, {
        message: 'Emergency contact number must be between 10 to 15 digits',
      })
      .optional(),
    bloodGroup: z
      .enum(['A+', 'A-', 'B+', 'B-', 'O+', 'O-', 'AB+', 'AB-'])
      .optional(),
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
    guardian: updateGuardianValidationSchema,
    localGuardian: updateLocalGuardianValidationSchema,
    profileImg: z
      .string()
      .trim()
      .url({ message: 'Invalid profile image URL' })
      .optional(),
    admissionSemester: z.string().optional(),
    department: z.string().optional(),
    idDeleted: z.boolean().default(false).optional(),
  }),
});

export const StudentValidationSchema = {
  createStudentValidationSchema,
  updateStudentValidationSchema,
};
