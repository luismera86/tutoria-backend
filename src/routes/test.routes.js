import { Router } from "express";
import { logger } from "../utils/logger.js";

const routerTest = Router();

routerTest.get("/loggerTest", (req, res) => {
  try {
    logger.info("Info log");
    logger.warn("Warning log");
    logger.error("Error log");

    res.status(200).json({ message: "Logger test" });
  } catch (error) {
    logger.error(error.message);
    res.status(500).json({ error: "Server internal error" });
  }
});

export { routerTest };
