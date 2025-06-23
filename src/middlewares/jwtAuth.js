import jwt from "jsonwebtoken";
import { JWT_SECRET } from "../config/env.js";

export default authentication = (req, res, next) => {
  const token = req.cookies.air_ninjaToken;
  if (!token || token.length === 10) {
    return res.status(400).send("Authentication failed: No token found");
  }
  const result = jwt.verify(token, JWT_SECRET);
  if (!result) {
    return res
      .status(400)
      .send("Authentication failed: Invalid Token or token expired");
  }
  console.log(result);
  req.userID = result.userID;
  next();
};
