import { NextFunction, Request, Response } from "express";
import appConfig from "../config/app.config";
import { UnAuthorizedError } from "../lib/api.errors";
import authUtils from "../lib/utils/auth.utils";
import { JWTPayload } from "../lib/types/user.types";

export default function roleProtectMiddleware(roles: string[]) {
  return function (req: Request, _res: Response, next: NextFunction) {
    if (!req.cookies) {
      throw new UnAuthorizedError("No cookies found");
    }

    const accessToken = req.cookies[appConfig.accessToken.cookie.name];

    if (!accessToken) {
      throw new UnAuthorizedError("Access token not found");
    }

    const payload = authUtils.verifyAccessToken(accessToken) as JWTPayload;

    if (!roles.includes(payload.role)) {
      throw new UnAuthorizedError("You don't have permission to do this");
    }

    req.user = payload;

    next();
  };
}
