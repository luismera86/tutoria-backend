import jwt from "jsonwebtoken";

const PRIVATE_KEY = "myprivatekey";

// Función para generar el token
const generateToken = (user) => { 
  const token = jwt.sign({ user }, PRIVATE_KEY, { expiresIn: "1h" });
  return token;
};

// Función para verificar el token
const verifyToken = (token) => {
  try {
    const decoded = jwt.verify(token, PRIVATE_KEY);
    return decoded;
  } catch (error) {
    return null;
  }
};

export { generateToken, verifyToken };