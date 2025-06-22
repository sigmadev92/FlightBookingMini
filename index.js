import express from "express";
import { APP_PORT } from "./src/config/env.js";
import { connectUsigMongoose } from "./src/config/mongoose.js";
const server = express();

const PORT = APP_PORT || 5000;

server.get("/", (req, res) => {
  return res.status(200).send("WORKING FINE");
});
server.listen(PORT, () => {
  connectUsigMongoose();
  console.log(`Server running on https://localhost:${PORT}`);
});
