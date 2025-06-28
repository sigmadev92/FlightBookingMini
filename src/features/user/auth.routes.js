import { Router } from "express";
import UserController from "./user.controller.js";
import { preventExposed, protectSensitive } from "../../middlewares/jwtAuth.js";
import { validate_user_reg } from "../../middlewares/data_validation/users/reg.js";
import validate_user_login from "../../middlewares/data_validation/users/login.js";
const userController = new UserController();

const authRoutes = Router();

authRoutes.post(
  "/register",
  preventExposed,
  validate_user_reg,
  (req, res, next) => {
    userController.register(req, res, next);
  }
);

authRoutes.post(
  "/login",
  preventExposed,
  validate_user_login,
  (req, res, next) => {
    userController.login(req, res, next);
  }
);

authRoutes.get("/logout", protectSensitive, (req, res, next) => {
  userController.logoutUser(req, res, next);
});
export default authRoutes;
