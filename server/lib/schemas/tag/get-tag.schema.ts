import { z } from "zod";

export const GetTagParamsSchema = z.object({
  identifier: z.string().min(1),
});

export type GetPostParams = z.infer<typeof GetTagParamsSchema>;

export const GetTagListParamsSchema = z.object({
  page: z.coerce.number().min(1).optional(),
  limit: z.coerce.number().min(5).optional(),
  query: z.string().optional(),
  orderBy: z.string().optional(),
});
