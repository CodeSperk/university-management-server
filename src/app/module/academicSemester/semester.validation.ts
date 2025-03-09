import { z } from 'zod';
import { Months, SemesterCode, SemesterNames } from './semester.constants';

const createSemesterValidationSchema = z.object({
  body: z.object({
    name: z.enum([...SemesterNames] as [string, ...string[]]),
    year: z.string(),
    code: z.enum([...SemesterCode] as [string, ...string[]]),
    startMonth: z.enum([...Months] as [string, ...string[]]),
    endMonth: z.enum([...Months] as [string, ...string[]]),
  }),
});

export const AcademicSemesterValidationSchema = {
  createSemesterValidationSchema,
};
