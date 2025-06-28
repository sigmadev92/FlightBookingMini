import dotenv from "dotenv";

dotenv.config();

const APP_PORT = process.env.PORT;
const MONGODB_URL = process.env.MONGODB_URL;
const JWT_SECRET = process.env.JWT_SECRET;
const HOST_MAIL = process.env.USER_MAIL;
const HOST_PASS = process.env.USER_PASS;
const SESSION_SECRET = process.env.SESSION_SECRET;
export {
  APP_PORT,
  MONGODB_URL,
  JWT_SECRET,
  HOST_MAIL,
  HOST_PASS,
  SESSION_SECRET,
};
