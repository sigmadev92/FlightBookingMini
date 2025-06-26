import { Router } from "express";
import UserController from "./user.controller.js";
import { preventExposed, protectSensitive } from "../../middlewares/jwtAuth.js";
const userController = new UserController();

const authRoutes = Router();

authRoutes.post("/register", preventExposed, (req, res, next) => {
  userController.register(req, res, next);
});

authRoutes.post("/login", preventExposed, (req, res, next) => {
  userController.login(req, res, next);
});

authRoutes.get("/logout", protectSensitive, (req, res, next) => {
  userController.logoutUser(req, res, next);
});
export default authRoutes;
