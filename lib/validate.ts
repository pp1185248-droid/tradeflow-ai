import { z } from 'zod';

export const registerSchema = z.object({
  name: z.string().min(2, 'Name must be at least 2 characters'),
  email: z.string().email('Invalid email'),
  password: z.string().min(6, 'Password must be at least 6 characters'),
  company: z.string().optional(),
});

export const loginSchema = z.object({
  email: z.string().email(),
  password: z.string().min(1),
});

export const shipmentSchema = z.object({
  originCountry: z.string().min(2),
  destinationCountry: z.string().min(2),
  items: z.array(z.object({
    description: z.string(),
    quantity: z.number(),
    value: z.number(),
    weight: z.number(),
  })),
  totalValue: z.number(),
  currency: z.string().default('USD'),
});
