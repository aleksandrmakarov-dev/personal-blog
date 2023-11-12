import { z } from "zod";

export const CreatePostValidationSchema = z.object({
  title: z.string().min(1).max(100),
  description: z.string().min(1).max(250),
  body: z.string().min(1),
  image: z.string().url().optional(),
  tags: z.array(z.string()).min(1).max(5),
  parent: z.string().optional(),
});

export type CreatePostValidation = z.infer<typeof CreatePostValidationSchema>;