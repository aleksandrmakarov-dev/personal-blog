import { NextFunction, Request, Response } from "express";
import { z } from "zod";
import {
  NotFoundError,
  BadRequestError,
  UnAuthorizedError,
} from "../lib/api.errors";
import mongoose from "mongoose";
import { TokenExpiredError, JsonWebTokenError } from "jsonwebtoken";
import { GenericErrorModelDTO } from "../lib/types";

function errorHandleMiddleware(
  err: Error,
  _req: Request,
  res: Response,
  _next: NextFunction
) {
  if (err instanceof NotFoundError) {
    const error: GenericErrorModelDTO = {
      code: "404",
      title: "Not found",
      message: err.message,
    };
    return res.status(404).json(error);
  }

  if (err instanceof BadRequestError) {
    const error: GenericErrorModelDTO = {
      code: "400",
      title: "Bad request",
      message: err.message,
    };
    return res.status(400).json(error);
  }

  if (err instanceof mongoose.Error.ValidationError) {
    const error: GenericErrorModelDTO = {
      code: "422",
      title: "Validation error",
      message: err.message,
    };
    return res.status(422).json(error);
  }

  if (err instanceof z.ZodError) {
    const error: GenericErrorModelDTO = {
      code: "422",
      title: "Validation error",
      message: err.message,
    };
    return res.status(422).json(error);
  }

  if (err instanceof TokenExpiredError) {
    const error: GenericErrorModelDTO = {
      code: "401",
      title: "Token expired",
      message: err.message,
    };
    return res.status(401).json(error);
  }

  if (err instanceof JsonWebTokenError) {
    const error: GenericErrorModelDTO = {
      code: "401",
      title: "Token error",
      message: err.message,
    };
    return res.status(401).json(error);
  }

  if (err instanceof UnAuthorizedError) {
    const error: GenericErrorModelDTO = {
      code: "401",
      title: "Unauthorized",
      message: err.message,
    };
    return res.status(401).json(error);
  }

  const error: GenericErrorModelDTO = {
    code: "500",
    title: "Internal error",
    message: err.message,
  };

  return res.status(500).json(error);
}

export default errorHandleMiddleware;
