import { Request, Response, NextFunction } from "express";
export interface ErrorHandler {
  message?: string;
  status?: string;
  statusCode?: number;
}
export const errorHandler = (
  err: ErrorHandler,
  req: Request,
  res: Response,
  next: NextFunction
) => {
  let error = { ...err };
  error.message = err.message;
  error.status = err.status || "error";

  res.status(error.statusCode || 500).json({
    status: err.status,
    error: error.message || "Server Error",
  });
};
