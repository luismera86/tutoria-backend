import { Schema, model } from 'mongoose';

const messageSchema = new Schema({
  user: String,
  message: String,
});

const Message = model('message', messageSchema);

export default Message;
