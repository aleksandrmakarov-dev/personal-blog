import { z } from "zod";

export const SignUpWithPasswordValidationSchema = z.object({
  email: z.string().email(),
  password: z.string().min(5).max(50),
});
