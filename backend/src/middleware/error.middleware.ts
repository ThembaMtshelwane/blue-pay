import { NextFunction, Request, Response } from "express";
import { NODE_ENV } from "../consts/env.consts";
import {
  BAD_REQUEST,
  INTERNAL_SERVER_ERROR,
  NOT_FOUND,
} from "../consts/http.codes";
import HTTP_Error from "../utils/httpError";
import { ZodError } from "zod";

/*
    @desc: For routes not found
*/
const notFound = (req: Request, res: Response, next: NextFunction) => {
  const error = new HTTP_Error(`Not Found - ${req.originalUrl}`, NOT_FOUND);
  next(error);
};

const handleZodError = (err: ZodError) => {
  const errors = err.issues.map((issue) => ({
    path: issue.path.join("."),
    message: issue.message,
  }));

  return {
    statusCode: BAD_REQUEST,
    body: {
      success: false,
      errors,
      message: "Validation Error",
    },
  };
};

/*
    @desc:Global error-handling middleware
*/
const errorHandler = (
  err: any | Error | ZodError | HTTP_Error,
  req: Request,
  res: Response,
  next: NextFunction
): Response | void => {
  if (err.name === "CastError" && err.kind === "ObjectId") {
    return res.status(NOT_FOUND).json({
      success: false,
      message: "Resource Not Found",
      stack: NODE_ENV === "development" ? err.stack : null,
    });
  }

  if (err instanceof HTTP_Error) {
    return res.status(err.statusCode).json({
      success: false,
      message: err.message,
      stack: NODE_ENV === "development" ? err.stack : null,
    });
  }

  if (err instanceof ZodError) {
    const { statusCode, body } = handleZodError(err);
    return res.status(statusCode).json(body);
  }

  return res.status(INTERNAL_SERVER_ERROR).json({
    success: false,
    message:
      "Serious server error, something went terribly wrong, call for help!",
    stack: NODE_ENV === "development" ? err.stack : null,
  });

  next();
};

export { notFound, errorHandler };
