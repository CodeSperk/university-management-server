import { z } from 'zod';

const createFacultyMemberNameSchema = z.object({
  firstName: z.string().min(1, 'First name is required').trim(),
  middleName: z.string().trim().optional(),
  lastName: z.string().min(1, 'Last name is required').trim(),
});

const createFacultyMemberSchema = z.object({
  body: z.object({
    designation: z.string().min(1, 'Designation is required').trim(),
    name: createFacultyMemberNameSchema,
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
    academicFaculty: z.string().min(1, 'Academic faculty is required'),
    academicDepartment: z.string().min(1, 'Academic department is required'),
  }),
});

export const FacultyMemberValidations = {
  createFacultyMemberSchema,
};
