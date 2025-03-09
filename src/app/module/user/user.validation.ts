import { z } from 'zod';

const createUserValidationSchema = z.object({
  body: z.object({
    password: z
      .string({
        invalid_type_error: 'Password must be string',
      })
      .max(12, { message: "Password can't be more than 12 characters" }),
  }),
});

export const UserValidationSchema = {
  createUserValidationSchema,
};
