import { messageModel } from "../../models/message.model.js";


class MessageManager {
  async getMessages() {
    const messages = await messageModel.find();

    return messages;
  }

  async saveMessage(message) {
    const newMessage = await messageModel.create(message);

    return newMessage;
  }
}

export const messageManager = new MessageManager();
