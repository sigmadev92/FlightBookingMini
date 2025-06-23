import { Router } from "express";
import UserController from "./user.controller.js";
const userRoutes = Router();

const userController = new UserController();

userRoutes.get("/", (req, res, next) => {
  userController.getUserProfile(req, res, next);
});
userRoutes.put("/update/details", (req, res, next) => {
  userController.updateUser(req, res, next);
});

userRoutes.put("/update/profile-pic", (req, res, next) => {
  userController.updateProfilePic(req, res, next);
});
userRoutes.put("/update/password", (req, res, next) => {
  userController.updatePassword(req, res, next);
});
export default userRoutes;
