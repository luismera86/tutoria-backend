import mongoose from "mongoose";
import config from "./config.js";

const { MONGO_URL } = config;

export const mongoDBConnection = async () => {
  try {
    await mongoose.connect(MONGO_URL);
    console.log("Conectado a la base de datos de MongoDB");
  } catch (error) {
    console.log(error);
  }
};
