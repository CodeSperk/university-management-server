import { z } from 'zod';
import { SemesterRegistrationStatus } from './semesterRegistration.constants';

const createSemesterRegisrationValidationSchema = z.object({
  body: z.object({
    academicSemester: z.string(),
    status: z.enum([...(SemesterRegistrationStatus as [string, ...string[]])]),
    startDate: z.string().datetime(),
    endDate: z.string().datetime(),
    minCredit: z.number(),
    maxCreding: z.number(),
  }),
});

const updateSemesterRegisrationValidationSchema = z.object({
  body: z.object({
    academicSemester: z.string().optional(),
    status: z
      .enum([...(SemesterRegistrationStatus as [string, ...string[]])])
      .optional(),
    startDate: z.string().datetime().optional(),
    endDate: z.string().datetime().optional(),
    minCredit: z.number().optional(),
    maxCreding: z.number().optional(),
  }),
});

export const SemesterRegistrationValidations = {
  createSemesterRegisrationValidationSchema,
  updateSemesterRegisrationValidationSchema,
};
