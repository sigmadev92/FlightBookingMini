import jwt from "jsonwebtoken";
import { JWT_SECRET } from "../config/env.js";

export default function authentication(req, res, next) {
  const token = req.cookies.air_ninjaToken;
  if (token) {
    const result = jwt.verify(token, JWT_SECRET);
    if (result) {
      console.log(result);
      req.userID = result.userID;
      req.loggedIn = true;
      req.role = result.userRole;
    }
  }

  next();
}

export const protectSensitive = (req, res, next) => {
  if (req.loggedIn) {
    return next();
  }
  return res.status(400).send("You must be loggedin to access this feature");
};

export const preventExposed = (req, res, next) => {
  if (!req.loggedIn) {
    return next();
  }
  return res.status(400).send("A user is already logged in with this system");
};
