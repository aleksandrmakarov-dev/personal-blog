import { z } from "zod";

export const CreatePostBodySchema = z.object({
  title: z.string().min(1).max(150),
  description: z.string().min(1).max(250),
  body: z.string().min(1),
  image: z.string().optional(),
  tags: z.array(z.string()).min(1).max(5),
  parent: z.string().optional(),
});

export type CreatePostBody = z.infer<typeof CreatePostBodySchema>;
