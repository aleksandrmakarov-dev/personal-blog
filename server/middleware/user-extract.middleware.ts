import { NextFunction, Request, Response } from "express";
import appConfig from "../config/app.config";
import authUtils from "../lib/utils/auth.utils";
import { JWTPayload } from "../lib/types/user.types";

export default function userExtractMiddleware() {
  return function (req: Request, _res: Response, next: NextFunction) {
    if (!req.cookies) {
      return next();
    }

    const accessToken = req.cookies[appConfig.accessToken.cookie.name];

    if (!accessToken) {
      return next();
    }

    const payload = authUtils.verifyAccessToken(accessToken) as JWTPayload;

    req.user = payload;

    next();
  };
}
