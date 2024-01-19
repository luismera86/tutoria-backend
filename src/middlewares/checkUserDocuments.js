import * as userServices from "../services/user.services.js";

export const checkUserDocuments = async (req, res, next) => {
  const { uid } = req.params;

  const user = await userServices.getUserById(uid);
  if (!user) return res.status(404).json({ msg: "Usuario no encontrado" });
  if (user.documents.length === 0 && user.role === "user") return res.status(400).json({ msg: "El usuario no tiene documentos" });
  user.documents.forEach((document) => {
    if (
      !document.name.includes("Identificación") &&
      !document.name.includes("Comprobante de domicilio") &&
      !document.name.includes("Comprobante de estado de cuenta")
    )
      return res.status(400).json({ msg: "El usuario no tiene la documentación necesaria para cambiar de rol" });
  });
  next();
};
