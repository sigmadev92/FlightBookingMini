import mongoose from "mongoose";
import userSchema from "./user.schema.js";

const UserModel = mongoose.model("User", userSchema);
import { CustomError } from "../../middlewares/errorHandler.js";
import bcrypt from "bcrypt";
export default class UserRepository {
  async signupRepo(_userdata) {
    const newUser = new UserModel(_userdata);
    await newUser.save();
    return newUser;
  }

  async loginRepo(_userdata) {
    const { email, password } = _userdata;
    if (!email || !password) {
      throw new CustomError(400, "Invalid email or password");
    }

    const user = await UserModel.findOne({ email });
    if (!user) {
      throw new CustomError(400, "User Not found");
    }
    const result = await bcrypt.compare(password, user.password);
    if (!result) {
      throw new CustomError(400, "Wrong Credentials");
    }
    return user;
  }

  async updateProfileRepo(_userID, _updateData) {
    const result = await UserModel.updateOne({ _id: _userID }, _updateData);
    console.log(result);
    return result;
  }
}
