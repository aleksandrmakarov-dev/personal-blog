import { z } from "zod";

export const CreateTagBodySchema = z.object({
  name: z.string().min(1).max(50),
});
