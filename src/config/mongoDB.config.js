import mongoose from "mongoose";

const MONGO_URI = "mongodb://127.0.0.1:27017/tutoria";

export const mongoDBConnection = async () => {
  try {
    await mongoose.connect(MONGO_URI);
    console.log("Conectado a la base de datos de MongoDB");
  } catch (error) {
    console.log(error);
  }
};
