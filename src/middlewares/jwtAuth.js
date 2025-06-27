import jwt from "jsonwebtoken";
import { JWT_SECRET } from "../config/env.js";

export default function authentication(req, res, next) {
  const token = req.cookies.air_ninjaToken;
  if (token) {
    const result = jwt.verify(token, JWT_SECRET);
    console.log(result);
    if (result) {
      console.log(" Arrived at jwt auth middleware");
      const userData = {
        userID: result.userID,
        loggedIn: true,
        role: result.userRole,
        testUser: result.testUser,
      };
      req.userData = userData;
    }
  }

  next();
}

export const protectSensitive = (req, res, next) => {
  if (req.userData?.loggedIn) {
    return next();
  }
  return res.status(400).send("You must be loggedin to access this feature");
};

export const preventExposed = (req, res, next) => {
  if (!req.userData?.loggedIn) {
    return next();
  }
  return res.status(400).send("A user is already logged in with this system");
};
