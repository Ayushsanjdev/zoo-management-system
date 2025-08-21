export class AppError extends Error {
  status: number;
  message: string;
  errors: { field: string; message: string }[];

  constructor(
    status: number,
    message: string,
    errors: { field: string; message: string }[] = []
  ) {
    super(message);
    this.status = status;
    this.message = message;
    this.errors = errors;
  }
}
