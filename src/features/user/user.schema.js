import mongoose from "mongoose";

const userSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    required: [true, "Email is required"],
    unique: true,
    lowercase: true,
    trim: true,
    validate: {
      validator: function (value) {
        return /^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/.test(value);
      },
      message: "Please enter a valid email address",
    },
  },
  password: {
    type: String,
    required: true,
  },

  role: {
    type: String,
    default: "user",
    enum: ["user", "admin"],
  },
  profilePicture: {
    type: String,
    required: true,
  },
  timestamp: {
    required: true,
  },
});

export default userSchema;
