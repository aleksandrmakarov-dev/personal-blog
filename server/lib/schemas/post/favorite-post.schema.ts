import { z } from "zod";

export const FavoritePostParamsSchema = z.object({
  identifier: z.string().min(1),
});

export const UnfavortiePostParamsSchema = z.object({
  identifier: z.string().min(1),
});
