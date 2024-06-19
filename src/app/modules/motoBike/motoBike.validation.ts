import { z } from 'zod';

const bikeValidationSchema = z.object({
  name: z.string().min(1, "Name is required"),
  description: z.string().min(1, "Description is required"),
  pricePerHour: z.number().positive("Price per hour must be a positive number"),
  isAvailable: z.boolean().default(true),
  cc: z.number().positive("CC must be a positive number"),
  year: z.number().int().gte(1900, "Year must be after 1900").lte(new Date().getFullYear(), "Year cannot be in the future"),
  model: z.string().min(1, "Model is required"),
  brand: z.string().min(1, "Brand is required"),
});

// Type for the validated data
type BikeValidation = z.infer<typeof bikeValidationSchema>;

export { bikeValidationSchema, BikeValidation };
