import { z } from 'zod';

const createStudentValidationSchema = z.object({
  body: z.object({
    name: z.string({
      invalid_type_error: 'Department name must be string',
      required_error: 'Dept. is a must',
    }),
    faculty: z.string({
      required_error: 'Faculty is required',
    }),
  }),
});

const updateStudentValidationSchema = z.object({
  body: z.object({
    name: z
      .string({
        invalid_type_error: 'Department name must be string',
        required_error: 'Dept. is a must',
      })
      .optional(),
    faculty: z
      .string({
        required_error: 'Faculty is required',
      })
      .optional(),
  }),
});

export const DepartmentValidation = {
  createStudentValidationSchema,
  updateStudentValidationSchema,
};
