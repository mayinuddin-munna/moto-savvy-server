import { z } from 'zod';

const createUserValidationSchema = z.object({
  name: z.string().min(1, 'Name is required'),
  email: z.string().email('Invalid email address'),
  password: z
    .string()
    .min(6, 'Password must be at least 6 characters long')
    .regex(/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d).+$/, {
      message:
        'Password must contain at least one lowercase, one uppercase, and one digit',
    }),
  phone: z.string(),
  address: z.string(),
  role: z.enum(['user', 'admin'], {
    message: 'Role must be user, admin',
  }),
});

export const UserValidation = { createUserValidationSchema };
