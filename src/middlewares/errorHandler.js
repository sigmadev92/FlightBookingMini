export class CustomError extends Error {
  constructor(statusCode, message) {
    super(message);
    this.statusCode = statusCode;
  }
}

export const handleError = (err, req, res, next) => {
  console.log("ERROR CAME HERE TOO");
  if (err instanceof CustomError) {
    if (req.requestType === "web") {
      return res.render("errors", { errors: err.message });
    }
    return res.status(err.statusCode).send(err.message);
  } else return res.status(400).send(err.message);
};
