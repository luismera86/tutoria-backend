import dotenv from "dotenv";

dotenv.config();

export default {
  MONGO_URL: process.env.MONGO_URL,
  MONGO_DB: process.env.MONGO_DB,
  JWT_SECRET: process.env.JWT_SECRET,
  PORT: process.env.PORT,
  COOKIE_SECRET: process.env.COOKIE_SECRET,
};
