import Message from "../../models/message.model.js";

class MessageManager {
  async getMessages() {
    const messages = await Message.find();

    return messages;
  }

  async saveMessage(message) {
    const newMessage = await Message.create(message);

    return newMessage;
  }
}

export const messageManager = new MessageManager();
