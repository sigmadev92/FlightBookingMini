import express from "express";
import cookieParser from "cookie-parser";
import expressEjsLayouts from "express-ejs-layouts";
import bodyparser from "body-parser";
import session from "express-session";
import path from "path";
import { APP_PORT, SESSION_SECRET } from "./src/config/env.js";
import { connectUsigMongoose } from "./src/config/mongoose.js";
import logger from "./src/middlewares/logger.js";
import webRoutes from "./src/routes/web.js";
import apiRoutes from "./src/routes/api.js";
import undefinedRoute from "./src/middlewares/route404.js";
import { handleError } from "./src/middlewares/errorHandler.js";
import authentication from "./src/middlewares/jwtAuth.js";
const server = express();

const PORT = APP_PORT || 5000;
server.use(cookieParser());
server.use(
  session({
    secret: SESSION_SECRET,
    saveUninitialized: false,
    resave: false,
    cookie: { secure: false, maxAge: 1000 * 60 * 30 },
  })
);

server.use(authentication);
// for parsing req.body
// 1. Via JSON
server.use(express.json());
server.use(bodyparser.urlencoded({ extended: true }));

server.use(express.static("public"));
server.set("view engine", "ejs");
server.set("views", path.join(path.resolve(), "src", "views"));
server.use(expressEjsLayouts);
server.use(logger);

server.use(
  "/web",
  (req, res, next) => {
    req.requestType = "web";
    next();
  },
  webRoutes
);
server.use(
  "/api",
  (req, res, next) => {
    req.requestType = "api";
    next();
  },
  apiRoutes
);

server.get("/", (req, res) => {
  return res.render("home");
});

server.use(undefinedRoute);

server.use(handleError);
server.listen(PORT, () => {
  connectUsigMongoose();
  console.log(`Server running on http://localhost:${PORT}`);
});
