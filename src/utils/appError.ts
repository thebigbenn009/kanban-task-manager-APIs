export class AppError extends Error {
  //declare properties for the object
  public readonly statusCode: number;
  public readonly status: "fail" | "error";
  public readonly isOperational: boolean;
  constructor(message: string, statusCode: number) {
    super(message);
    (this.statusCode = statusCode),
      (this.status = `${statusCode}`.startsWith("4") ? "fail" : "error");
    this.isOperational = true;
    Error.captureStackTrace(this, this.constructor);
  }
}
