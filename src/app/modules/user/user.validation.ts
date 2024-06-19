import { z } from 'zod';

const userSchema = z.object({
  name: z.string().min(1, 'Name is required'),
  email: z.string().email({ message: 'Invalid email format' }),
  password: z.string().min(8, 'Password must be at least 8 characters long'),
  phone: z.string().regex(/^\+?[1-9]\d{1,11}$/, 'Invalid phone number format'),
  address: z.string().min(1, 'Address is required'),
  role: z.enum(['admin', 'user'], {
    message: 'Role must be either "admin" or "user"',
  }),
});

export default userSchema;
