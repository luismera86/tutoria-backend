import { ticketModel } from "../models/ticket.model.js";

const generateTicket = async (ticket) => {
  const newTicket = await ticketModel.create(ticket);

  return newTicket;
};

const getTicketFromEmail = async (email) => {
  const ticket = await ticketModel.findOne({ purchaser: email });

  return ticket;
};

export { generateTicket, getTicketFromEmail };