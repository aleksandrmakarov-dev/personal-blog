import { z } from "zod";

export const UpdatePostBodySchema = z.object({
  title: z.string().min(1).max(150),
  description: z.string().min(1).max(250),
  body: z.string().min(1),
  image: z.string().nullable(),
  tags: z.array(z.string()).min(1).max(5),
  parent: z.string().nullable(),
});

export type UpdatePostBody = z.infer<typeof UpdatePostBodySchema>;

export const UpdatePostParamsSchema = z.object({
  identifier: z.string().min(1),
});

export type UpdatePostParams = z.infer<typeof UpdatePostParamsSchema>;
