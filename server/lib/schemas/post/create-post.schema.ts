import { z } from "zod";

export const CreatePostBodySchema = z.object({
  title: z.string().min(1).max(150),
  description: z.string().min(1).max(250),
  body: z.string().min(1),
  image: z.string().nullable(),
  tags: z
    .array(z.string())
    .min(1)
    .max(3, { message: "Tags must be between 1 and 3" }),
  parent: z.string().nullable(),
});

export type CreatePostBody = z.infer<typeof CreatePostBodySchema>;
