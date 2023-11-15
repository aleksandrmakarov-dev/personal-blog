import { z } from "zod";

export const CreateTagValidationSchema = z.object({
  name: z.string().min(1).max(50),
});
