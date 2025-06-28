import mongoose from "mongoose";
import userSchema from "./user.schema.js";

const UserModel = mongoose.model("User", userSchema);
import { CustomError } from "../../middlewares/errorHandler.js";
import bcrypt from "bcrypt";
export default class UserRepository {
  async signupRepo(_userdata) {
    try {
      const newUser = new UserModel(_userdata);
      await newUser.save();
      const userObject = newUser.toObject();
      delete userObject.password;
      return {
        success: true,
        user: userObject,
      };
    } catch (error) {
      return {
        success: false,
        error: {
          statusCode: error.name === "MongooseError" ? 400 : 500,
          message: error.message,
        },
      };
    }
  }

  async loginRepo(_userdata) {
    const { email, password } = _userdata;

    const user = await UserModel.findOne({ email });
    if (!user) {
      return {
        success: false,
        error: {
          statusCode: 400,
          message: "Email not found",
        },
      };
    }
    const result = await bcrypt.compare(password, user.password);
    if (!result) {
      return {
        success: false,
        error: {
          statusCode: 400,
          message: "Wrong credentials",
        },
      };
    }

    const userObj = user.toObject();
    delete userObj.password;
    return {
      success: true,
      user: userObj,
    };
  }

  async updateProfileRepo(_userID, _updateData) {
    const result = await UserModel.findByIdAndUpdate(_userID, _updateData, {
      new: true,
      runValidators: true,
    }).select("-password");
    if (!result) {
      throw new CustomError(400, "User not found");
    }
    return result;
  }
}
