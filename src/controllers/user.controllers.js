import * as userServices from "../services/user.services.js";
import { logger } from "../utils/logger.js";

const createUser = async (user) => {
  try {
    const newUser = await userServices.createUser(user);
    return newUser;
  } catch (error) {
    logger.error(error.message);
    res.status(500).json({ error: "Server internal error" });
  }
};

const getUserByEmail = async (email) => {
  try {
    const user = await userServices.getUserByEmail(email);
    return user;
  } catch (error) {
    logger.error(error.message);
    res.status(500).json({ error: "Server internal error" });
  }
};

const getUserById = async (id) => {
  try {
    const user = await userServices.getUserById(id);
    return user;
  } catch (error) {
    logger.error(error.message);
    res.status(500).json({ error: "Server internal error" });
  }
};

const changePassword = async (email, newPassword) => {
  try {
    await userServices.changePassword(email, newPassword);
    return "Contraseña cambiada con éxito";
  } catch (error) {
    logger.error(error.message);
    res.status(500).json({ error: "Server internal error" });
  }
};

const changeRole = async (req, res) => {
  const { uid } = req.params;
  try {
    const user = await userServices.getUserById(uid);
    if (!user) return res.status(404).json({ msg: "Usuario no encontrado" });
    await userServices.changeRole(user.email);
    const userUpdated = await userServices.getUserById(uid);

    res.status(200).json({ status: "success", msg: "Rol cambiado con éxito", newRole: userUpdated.role });
  } catch (error) {
    logger.error(error.message);
    res.status(500).json({ error: "Server internal error" });
  }
};

export { createUser, getUserByEmail, getUserById, changePassword, changeRole };
