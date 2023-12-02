import { z } from "zod";

export const GetTagParamsSchema = z.object({
  identifier: z.string().min(1),
});

export type GetPostParams = z.infer<typeof GetTagParamsSchema>;
