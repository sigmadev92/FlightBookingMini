import dotenv from "dotenv";

dotenv.config();

const APP_PORT = process.env.PORT;
const MONGODB_URL = process.env.MONGODB_URL;
export { APP_PORT, MONGODB_URL };
