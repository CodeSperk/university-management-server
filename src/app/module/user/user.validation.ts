import { z } from 'zod';
import { UserStatus } from './user.constants';
const changeStatusValidationSchema = z.object({
  body: z.object({
    status: z.enum([...UserStatus] as [string, ...string[]]),
  }),
});

export const UserValidations = {
  changeStatusValidationSchema,
};
