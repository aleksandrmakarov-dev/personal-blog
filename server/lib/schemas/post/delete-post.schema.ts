import { z } from "zod";

export const DeletePostParamsSchema = z.object({
  identifier: z.string().min(1),
});

export type DeletePostParams = z.infer<typeof DeletePostParamsSchema>;
