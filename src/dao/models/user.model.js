import { Schema, model } from "mongoose";

const userSchema = new Schema({
  first_name: String,
  last_name: String,
  email: {
    type: String,
    unique: true, // El mail debe ser único
  },
  age: Number,
  password: String,
});

const userModel = model("user", userSchema);

export { userModel };
