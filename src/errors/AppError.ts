import { STATUS_CODES } from "http";

export class AppError {
  public readonly statusCode: number;
  public readonly message: string;
  public readonly error: string;

  constructor(message: string, statusCode = 400) {
    this.statusCode = statusCode;
    this.message = message;
    this.error = STATUS_CODES[statusCode];
  }
}
