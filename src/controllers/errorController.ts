import { Response, Request, NextFunction } from "express";
import { AppError } from "../utils/appError";

interface customError extends Error {
  statusCode: number;
  status: string;
  isOperational: boolean;
  code?: number;
  path?: string;
  value?: string;
  errors?: { [key: string]: { message: string } };
}

export const globalError = (
  err: customError,
  req: Request,
  res: Response,
  next: NextFunction
) => {
  err.statusCode = err.statusCode || 500;
  err.status = err.status || "error";
  if (process.env.NODE_ENV === "development") {
    return res.status(err.statusCode || 500).json({
      status: err.status,
      err,
      message: err.message,
    });
  } else if (process.env.NODE_ENV === "production") {
    let error = { ...err };
    error.message = err.message;

    if (err.name === "CastError") {
      error = new AppError("Invalid ID", 400);
    }
    return res.status(error.statusCode || 500).json({
      status: error.status,
      message: error.isOperational
        ? error.message
        : "Something went very wrong",
    });
  }
};
