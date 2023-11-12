import { z } from "zod";

export const GetPostParamsValidationSchema = z.object({
  identifier: z.string().min(1),
});

export type GetPostParamsValidation = z.infer<
  typeof GetPostParamsValidationSchema
>;
