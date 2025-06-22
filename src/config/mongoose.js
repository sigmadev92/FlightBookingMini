import mongoose from "mongoose";
import { MONGODB_URL } from "./env.js";

const baseURL = MONGODB_URL || "0.0.0.0:27017";
export const connectUsigMongoose = async () => {
  try {
    await mongoose.connect(`mongodb://${baseURL}/flightninja`);
    console.log("Connected to Mongodb Database using mongoose");
  } catch (error) {
    console.log(error);
    process.exit(1);
  }
};
