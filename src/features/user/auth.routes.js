import { Router } from "express";
import UserController from "./user.controller.js";

const userController = new UserController();

const authRoutes = Router();

authRoutes.post("/register", (req, res, next) => {
  userController.register(req, res, next);
});

authRoutes.post("/login", (req, res, next) => {
  userController.login(req, res, next);
});

authRoutes.get("/logout", (req, res, next) => {
  userController.logoutUser(req, res, next);
});
export default authRoutes;
