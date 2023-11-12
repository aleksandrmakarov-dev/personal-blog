import { z } from "zod";

export const DeletePostParamsValidationSchema = z.object({
  identifier: z.string().min(1),
});

export type DeletePostParamsValidation = z.infer<
  typeof DeletePostParamsValidationSchema
>;
