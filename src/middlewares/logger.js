import fs from "fs";
import path from "path";

export default function logger(req, res, next) {
  let show = "no-body";
  if (req.method === "POST" || req.method === "PUT") {
    if (
      req.url === "/register" ||
      req.url === "/register" ||
      req.url === "/update"
    ) {
      show = "SENS";
    } else show = "BODY";
  }
  const logLine = `Arrived at ${req.method} ${
    req.url
  } on ${new Date()} ${show} \n\n`;

  fs.appendFileSync("logger.log", logLine);

  next();
}
