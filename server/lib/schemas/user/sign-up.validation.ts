import { z } from "zod";

export const SignUpWithPasswordBodySchema = z.object({
  name: z.string().min(2).max(50),
  email: z.string().email(),
  password: z.string().min(5).max(50),
});
