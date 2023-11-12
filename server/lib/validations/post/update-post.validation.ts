import { z } from "zod";

export const UpdatePostValidationSchema = z.object({
  title: z.string().min(1).max(100),
  description: z.string().min(1).max(250),
  body: z.string().min(1),
  image: z.string().url().optional(),
  tags: z.array(z.string()).min(1).max(5),
  parent: z.string().optional(),
});

export type UpdatePostValidation = z.infer<typeof UpdatePostValidationSchema>;

export const UpdatePostParamsValidationSchema = z.object({
  identifier: z.string().min(1),
});

export type UpdatePostParamsValidation = z.infer<
  typeof UpdatePostParamsValidationSchema
>;
