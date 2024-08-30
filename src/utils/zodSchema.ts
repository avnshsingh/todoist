import {z} from 'zod';

export const todoSchema = z.object({
  done: z.boolean(),
  id: z.string(),
  title: z.string().min(1, 'Title is required'),
});
