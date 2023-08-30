import { verifyToken } from "../utils/jwt.js";

const checkToken = async (req, res, next) => {
  const { user } = verifyToken(req.cookies.token);
  if (user) {
    next();
  } else {
    res.status(401).send({ error: "Invalid token" });
  }
};

export { checkToken };

