import { z } from 'zod';

const createFacultyValidationSchema = z.object({
  body: z.object({
    name: z.string({
      invalid_type_error: 'Academic Faculty must be string',
    }),
  }),
});

const updateFacultyValidationSchema = z.object({
  body: z.object({
    name: z
      .string({
        invalid_type_error: 'Academic Faculty must be string',
      })
      .optional(),
  }),
});

export const AcademicFacultyValidations = {
  createFacultyValidationSchema,
  updateFacultyValidationSchema,
};
