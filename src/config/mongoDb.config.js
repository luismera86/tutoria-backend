import mongoose from "mongoose";

export const connectMongoDB = async () => {
  try {
    await mongoose.connect("mongodb+srv://luis:123@tutoria2.wxrtz25.mongodb.net/tutoria");
    console.log("Conectado a la base de datos");
  } catch (error) {
    console.log(error);
  }
};

