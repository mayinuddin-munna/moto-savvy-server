import mongoose from 'mongoose';
import { z } from 'zod';

const bookingValidationSchema = z.object({
  userId: z.string().refine((id) => mongoose.Types.ObjectId.isValid(id), {
    message: 'Invalid user ID',
  }),
  bikeId: z.string().refine((id) => mongoose.Types.ObjectId.isValid(id), {
    message: 'Invalid bike ID',
  }),
  startTime: z.date(),
  returnTime: z.date().optional(),
  totalCost: z.number().min(0, { message: 'Total cost must be positive' }),
  isReturned: z.boolean().default(false),
});

export default bookingValidationSchema;
