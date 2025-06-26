import UserRepository from "./user.repository.js";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import { JWT_SECRET } from "../../config/env.js";
import { sendtheMail } from "../../middlewares/nodemalier.js";
export default class UserController {
  constructor() {
    this.UserRepository = new UserRepository();
  }

  register = async (req, res, next) => {
    try {
      const { email, password, name } = req.body;
      const hashedPassword = await bcrypt.hash(password, 10);
      req.body.password = hashedPassword;
      const response = await this.UserRepository.signupRepo(req.body);
      await sendtheMail({
        receiver: email,
        subject: "User Registration Successful",
        html: `<b>Dear ${name}</b> <p>You are successfully registered with our website AirNinja-Flight Booking app powered by Coding Ninjas. We are waiting for you to checkout our services.</p> <b>Thank you</b>`,
      });
      return res.status(201).send({
        success: true,
        message: "User Registration Successful",
        user: response,
      });
    } catch (error) {
      console.log("sdsds");
      return next(error);
    }
  };
  login = async (req, res, next) => {
    try {
      const response = await this.UserRepository.loginRepo(req.body);
      const token = jwt.sign({ userID: response._id }, JWT_SECRET);
      res.cookie("air_ninjaToken", token);
      return res.status(200).send({
        success: true,
        message: "Logged In successfully",
        air_ninjaToken: token,
      });
    } catch (error) {
      next(error);
    }
  };

  getUserProfile = async (req, res, next) => {};
  updateUser = async (req, res, next) => {
    const userID = req.userID;
    try {
      const response = await this.UserRepository.updateProfileRepo(
        userID,
        req.body
      );

      return res.status(200).send({
        success: true,
        message: "Profile updated successfully",
        user: response,
      });
    } catch (error) {
      next(error);
    }
  };
  updateProfilePic = async (req, res, next) => {};

  updatePassword = async (req, res, next) => {};

  logoutUser = (req, res, next) => {
    res
      .clearCookie("air_ninjaToken")
      .status(200)
      .send("User logged out successfully");
  };
}
