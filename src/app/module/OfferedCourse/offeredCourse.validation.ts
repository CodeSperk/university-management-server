import { z } from 'zod';
import { Days } from './offeredCourse.constants';

const timeRegex = /^([01]\d|2[0-3]):([0-5]\d)$/;
const timeStingSchema = z.string().refine((time) => timeRegex.test(time), {
  message: 'Expected "HH:MM" in 24 hour Format',
});

const createOfferedCourseValidationSchema = z.object({
  body: z
    .object({
      semesterRegistration: z.string(),
      academicFaculty: z.string(),
      academicDepartment: z.string(),
      course: z.string(),
      faculty: z.string(),
      maxCapacity: z.number(),
      section: z.number(),
      days: z.array(z.enum([...Days] as [string, ...string[]])),
      startTime: timeStingSchema,
      endTime: timeStingSchema,
    })
    .refine(
      (body) => {
        const start = new Date(`1970-01-01T${body.startTime}:00`);
        const end = new Date(`1970-01-01T${body.endTime}:00`);

        return start < end;
      },
      { message: 'Start time should be before end time' },
    ),
});

const updateOfferedCourseValidationSchema = z.object({
  body: z
    .object({
      faculty: z.string(),
      maxCapacity: z.number(),
      days: z.array(z.enum([...Days] as [string, ...string[]])),
      startTime: timeStingSchema,
      endTime: timeStingSchema,
    })
    .refine(
      (body) => {
        const start = new Date(`1970-01-01T${body.startTime}:00`);
        const end = new Date(`1970-01-01T${body.endTime}:00`);

        return start < end;
      },
      { message: 'Start time should be before end time' },
    ),
});

export const OfferedCourseValidationSchema = {
  createOfferedCourseValidationSchema,
  updateOfferedCourseValidationSchema,
};
