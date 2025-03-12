import { z } from 'zod';

const createFacultyNameSchema = z.object({
  firstName: z.string().min(1, 'First name is required').trim(),
  middleName: z.string().trim().optional(),
  lastName: z.string().min(1, 'Last name is required').trim(),
});

const createFacultySchema = z.object({
  body: z.object({
    designation: z.string().min(1, 'Designation is required').trim(),
    name: createFacultyNameSchema,
    gender: z.enum(['male', 'female'], {
      errorMap: () => ({ message: 'Gender must be either "male" or "female"' }),
    }),
    dateOfBirth: z
      .string()
      .regex(
        /^\d{4}-\d{2}-\d{2}$/,
        'Date of Birth must be in YYYY-MM-DD format',
      ),
    email: z.string().email('Invalid email format').trim(),
    contactNo: z
      .string()
      .regex(/^\+?\d{11,14}$/, 'Invalid contact number format'),
    // user: z.string(),
    emergencyContactNo: z
      .string()
      .regex(/^\+?\d{11,14}$/, 'Invalid emergency contact number format'),
    presentAddress: z.string().min(1, 'Present address is required').trim(),
    permanentAddress: z.string().min(1, 'Permanent address is required').trim(),
    profileImage: z.string().optional(),
    academicDepartment: z.string().min(1, 'Academic department is required'),
  }),
});

const updateFacultyNamesSchema = z.object({
  firstName: z.string().trim().optional(),
  middleName: z.string().trim().optional(),
  lastName: z.string().trim().optional(),
});

const updateFacultySchema = z.object({
  body: z.object({
    designation: z.string().trim().optional(),
    name: updateFacultyNamesSchema.optional(),
    gender: z
      .enum(['male', 'female'], {
        errorMap: () => ({
          message: 'Gender must be either "male" or "female"',
        }),
      })
      .optional(),
    dateOfBirth: z
      .string()
      .regex(
        /^\d{4}-\d{2}-\d{2}$/,
        'Date of Birth must be in YYYY-MM-DD format',
      )
      .optional(),
    email: z.string().email('Invalid email format').trim().optional(),
    contactNo: z
      .string()
      .regex(/^\+?\d{11,14}$/, 'Invalid contact number format')
      .optional(),
    emergencyContactNo: z
      .string()
      .regex(/^\+?\d{11,14}$/, 'Invalid emergency contact number format')
      .optional(),
    presentAddress: z.string().trim().optional(),
    permanentAddress: z.string().trim().optional(),
    profileImage: z.string().optional(),
    academicFaculty: z.string().trim().optional(),
    academicDepartment: z.string().trim().optional(),
  }),
});

export const FacultyValidations = {
  createFacultySchema,
  updateFacultySchema,
};
