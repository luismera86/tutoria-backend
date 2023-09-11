import mongoose from "mongoose";
import config from "./config.js";
import { logger } from "../utils/logger.js";

const { MONGO_URL } = config;

export const mongoDBConnection = async () => {
  try {
    await mongoose.connect(MONGO_URL);
    logger.info("Conexión con MongoDB establecida");
  } catch (error) {
    logger.info("Error al conectar con MongoDB");
    logger.error(error.message);
  }
};
