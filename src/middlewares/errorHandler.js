export class CustomError extends Error {
  constructor(statusCode, message) {
    super(message);
    this.statusCode = statusCode;
  }
}

export function handleError(err, req, res, next) {
  if (err instanceof customError) {
    return res.status(err.statusCode).send(err.message);
  }
  return res.status(400).send(err.message);
}
