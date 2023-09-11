import * as ticketService from "../services/ticket.services.js";
import * as cartService from "../services/cart.services.js";

const generateTicket = async (req, res) => {
  try {
    const user = req.user;
    const cart = await cartService.getCartFromEmail(user.email);
    const data = {
      purchaser: user.email,
      amount: cart.total,
    };
    const ticket = await ticketService.generateTicket(data);

    res.status(201).json(ticket);
  } catch (error) {
    console.log(error);
  }
};

const getTicketFromEmail = async (req, res) => {
  try {
    const user = req.user;
    const ticket = await ticketService.getTicketFromEmail(user.email);
    res.status(200).json(ticket);
  } catch (error) {
    console.log(error);
  }
};

export { generateTicket, getTicketFromEmail };
