import { model, Schema } from "mongoose";

const userSchema = new Schema({
  first_name: {
    type: String
  },
  last_name: {
    type: String
  },
  email: {
    type: String
  },
  age: {
    type: Number
  },
  password: {
    type: String
  }
})

const userModel = model("user", userSchema);

export default userModel;