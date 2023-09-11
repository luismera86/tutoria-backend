import * as ticketService from "../services/ticket.services.js";
import * as cartService from "../services/cart.services.js";
import { logger } from "../utils/logger.js";

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
    logger.error(error.message);
    res.status(500).json({ error: "Server internal error" });
  }
};

const getTicketFromEmail = async (req, res) => {
  try {
    const user = req.user;
    const ticket = await ticketService.getTicketFromEmail(user.email);
    res.status(200).json(ticket);
  } catch (error) {
    logger.error(error.message);
    res.status(500).json({ error: "Server internal error" });
  }
};

export { generateTicket, getTicketFromEmail };
