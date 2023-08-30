import { Schema, model } from "mongoose";

const messageSchema = new Schema({
  user: String,
  message: String,
});

const messageModel = model("message", messageSchema);

export { messageModel };
