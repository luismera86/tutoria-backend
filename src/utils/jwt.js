import jwt from "jsonwebtoken";
import config from "../config/config.js";

const { JWT_SECRET } = config;

// Función para generar el token
const generateToken = (user) => { 
  const token = jwt.sign({ user }, JWT_SECRET, { expiresIn: "1h" });
  return token;
};

// Función para verificar el token
const verifyToken = (token) => {
  try {
    const decoded = jwt.verify(token, JWT_SECRET);
    return decoded;
  } catch (error) {
    return null;
  }
};

export { generateToken, verifyToken };