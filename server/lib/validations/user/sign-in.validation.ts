import { z } from "zod";

export const SignInWithPasswordValidationSchema = z.object({
  email: z.string().email(),
  password: z.string().min(5).max(50),
});
