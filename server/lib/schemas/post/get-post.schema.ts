import { z } from "zod";

export const GetPostParamsSchema = z.object({
  identifier: z.string().min(1),
});

export type GetPostParams = z.infer<typeof GetPostParamsSchema>;

export const GetPostListParamsSchema = z.object({
  populate: z.string().optional(),
  paged: z.string().optional(),
  page: z.coerce.number().min(1).optional(),
  limit: z.coerce.number().min(5).optional(),
  query: z.string().optional(),
  orderBy: z.string().optional(),
  tag: z.string().optional(),
});
