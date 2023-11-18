import { z } from "zod";

export const GetPostParamsValidationSchema = z.object({
  identifier: z.string().min(1),
});

export type GetPostParamsValidation = z.infer<
  typeof GetPostParamsValidationSchema
>;

export const GetPostListParamsValidationSchema = z.object({
  page: z.coerce.number().min(1).optional(),
  limit: z.coerce.number().min(5).optional(),
  query: z.string().optional(),
  orderBy: z.string().optional(),
});
