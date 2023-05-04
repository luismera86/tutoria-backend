import Message from "../../models/message.model.js"

export class MessageManager {

  async getMessages() {
    const messages = await Message.find();

    return messages;
  }

  async saveMessage(message) {
    const newMessage = await Message.create(message);

    return newMessage;
  }
}