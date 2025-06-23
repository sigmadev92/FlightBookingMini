import express from "express";
import cookieParser from "cookie-parser";
import bodyparser from "body-parser";
import { APP_PORT } from "./src/config/env.js";
import { connectUsigMongoose } from "./src/config/mongoose.js";
import logger from "./src/middlewares/logger.js";
const server = express();

const PORT = APP_PORT || 5000;
server.use(cookieParser());
server.use(express.json());
server.use(bodyparser.urlencoded());

server.get("/", logger, (req, res) => {
  return res.status(200).send("WORKING FINE");
});
server.listen(PORT, () => {
  connectUsigMongoose();
  console.log(`Server running on https://localhost:${PORT}`);
});
