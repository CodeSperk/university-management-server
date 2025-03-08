import { z } from 'zod';

const useValidationSchema = z.object({
  password: z
    .string({
      invalid_type_error: 'Password must be string',
    })
    .max(12, { message: "Password can't be more than 12 characters" }),
});

export const UserValidation = {
  useValidationSchema,
};
