import { Router } from "express";
import { preventExposed, protectSensitive } from "../../middlewares/jwtAuth.js";
import { validate_user_reg } from "../../middlewares/data_validation/users/reg.js";
import multerStorage from "../../middlewares/multer.js";
import UserController from "./user.controller.js";
import validate_user_login from "../../middlewares/data_validation/users/login.js";

const userController = new UserController();
const userWebRoutes = Router();

userWebRoutes.get("/register", preventExposed, (req, res) => {
  res.render("register");
});
userWebRoutes.get("/login", preventExposed, (req, res) => {
  let msg;
  if (req.session.message) {
    msg = req.session.message;
  }
  delete req.session.message;
  res.render("login", { success: msg });
});
userWebRoutes.get("/profile", protectSensitive, (req, res) => {
  res.render("profile");
});
userWebRoutes.get("/dashboard", protectSensitive, (req, res) => {
  if (req.userData.role === "admin") {
    return res.render("admin-dashboard");
  } else res.render("user-dashboard");
});

userWebRoutes.get("/logout", protectSensitive, (req, res) => {
  req.session.destroy((err) => {
    if (err) {
      console.error("Error destroying session:", err);
      return res.redirect("/dashboard");
    }
    res.clearCookie("air_ninjaToken");
    res.clearCookie("session.sid");
    return res.redirect("/web/users/login");
  });
});
userWebRoutes.get("/forgot-password", preventExposed, (req, res) => {
  res.render("forgot_password");
});

userWebRoutes.post(
  "/register",
  multerStorage.single("profilePicture"),
  validate_user_reg,
  (req, res, next) => {
    userController.register(req, res, next);
  }
);
userWebRoutes.post(
  "/login",
  preventExposed,
  validate_user_login,
  (req, res, next) => {
    userController.login(req, res, next);
  }
);
userWebRoutes.post("/change-password", (req, res) => {});

export default userWebRoutes;
