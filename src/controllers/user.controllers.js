import * as userServices from "../services/user.services.js";
import { logger } from "../utils/logger.js";

const getAllUsers = async (req, res) => {
  try {
    const users = await userServices.getAllUsers();
    res.status(200).json(users);
  } catch (error) {
    logger.error(error.message);
    res.status(500).json({ error: "Server internal error" });
  }
};

const getUserById = async (req, res) => {
  const { uid } = req.params;
  try {
    const user = await userServices.getUserById(uid);
    if (!user) return res.status(400).json({ msg: "User not found" });
    res.status(200).json(user);
  } catch (error) {
    logger.error(error.message);
    res.status(500).json({ error: "Server internal error" });
  }
};

const getUserByEmail = async (req, res) => {
  const { email } = req.params;
  try {
    const user = await userServices.getUserByEmail(email);
    if (!user) return res.status(400).json({ msg: "User not found" });
    res.status(200).json(user);
  } catch (error) {
    logger.error(error.message);
    res.status(500).json({ error: "Server internal error" });
  }
};

const deleteUser = async (req, res) => {
  const { uid } = req.params;
  try {
    const user = await userServices.getUserById(uid);
    if (!user) return res.status(404).json({ msg: "Usuario no encontrado" });
    await userServices.deleteUser(uid);
    res.status(200).json({ status: "success", msg: "Usuario borrado con éxito" });
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

const addFiles = async (req, res) => {
  const { uid } = req.params;
  try {
    const user = await userServices.getUserById(uid, req.files);
    if (!user) return res.status(404).json({ msg: "Usuario no encontrado" });
    const files = Object.values(req.files).flat();

    await userServices.addFiles(uid, files);
    const userUpdated = await userServices.getUserById(uid);
    res.status(200).json({ status: "success", msg: "Archivos subidos con éxito", user: userUpdated });
  } catch (error) {
    logger.error(error.message);
    res.status(500).json({ error: "Server internal error" });
  }
};

const deleteUsers = async (req, res) => {
  try {
    await userServices.deleteUsers();
    res.status(200).json({ status: "success", msg: "Usuarios borrados con éxito" });
  } catch (error) {
    logger.error(error.message);
    res.status(500).json({ error: "Server internal error" });
  }
};

export { changeRole, getAllUsers, getUserById, deleteUser, getUserByEmail, addFiles, deleteUsers };
