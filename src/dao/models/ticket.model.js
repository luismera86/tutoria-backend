import { Schema, model } from "mongoose";

const ticketSchema = new Schema({
  code: String,
  purchase_datetime: Date,
  amount: Number,
  purchaser: String, // email del usuario que compró
});

const ticketModel = model("ticket", ticketSchema);

export { ticketModel };
