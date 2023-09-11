import { userDTO } from "../dto/user.dto.js";
import { logger } from "../utils/logger.js";
const login = async (req, res) => {
  try {
    if (!req.user) return res.status(400).send({ status: "error", message: "Error credenciales inválidas" });

    req.session.user = userDTO(req.user);

    res.send({ status: "success", payload: req.session.user });
  } catch (error) {
    logger.error(error.message);
    res.status(500).json({ error: "Server internal error" });
  }
};

const logout = async (req, res) => {
  try {
    // Destruimos la sesión
    req.session.destroy((err) => {
      if (err) {
        return res.status(500).json({ error: "Error al cerrar sesión" });
      }
      // Devolvemos el mensaje de sesión cerrada
      res.json({ message: "Sesión cerrada" });
    });
  } catch (error) {
    logger.error(error.message);
    res.status(500).json({ error: "Server internal error" });
  }
};

const current = async (req, res) => {
  try {
    res.send({ status: "success", payload: req.session.user });
  } catch (error) {
    logger.error(error.message);
    res.status(500).json({ error: "Server internal error" });
  }
};

const github = async (req, res) => {
  try {
    req.session.user = userDTO(req.user);
    res.redirect("/profile");
  } catch (error) {
    logger.error(error.message);
    res.status(500).json({ error: "Server internal error" });
  }
};

export { login, logout, current, github };
