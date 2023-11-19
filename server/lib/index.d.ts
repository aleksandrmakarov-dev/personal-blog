import { JWTPayload } from "./types/user.types";

declare global {
  namespace Express {
    interface Request {
      user?: JWTPayload;
    }
  }
}
