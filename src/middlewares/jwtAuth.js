import jwt from "jsonwebtoken";
import { JWT_SECRET } from "../config/env.js";

export default function authentication(req, res, next) {
  console.log(" Arrived at jwt auth middleware");
  const token = req.cookies.air_ninjaToken;

  res.locals.user = req.session.user || null;

  if (token) {
    const result = jwt.verify(token, JWT_SECRET);
    if (result) {
      const userData = {
        userID: result.userID,
        loggedIn: true,
        role: result.userRole,
        testUser: result.testUser,
        userMail: result.userMail,
      };
      req.userData = userData;
      if (res.locals.user === null) {
        res.locals.user = userData;
      }
    }
  }

  next();
}

export const protectSensitive = (req, res, next) => {
  if (req.userData?.loggedIn) {
    return next();
  }
  if (req.requestType === "web") {
    return res.redirect("/web/users/login");
  }
  return res.status(400).send("You must be loggedin to access this feature");
};

export const preventExposed = (req, res, next) => {
  if (!req.userData?.loggedIn) {
    return next();
  }
  if (req.requestType === "web") {
    return res.redirect("/");
  }
  return res.status(400).send("A user is already logged in with this system");
};
