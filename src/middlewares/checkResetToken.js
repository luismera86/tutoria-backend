import { verifyToken } from "../utils/jwt.js";

const checkResetToken = async (req, res, next) => {
  const token = verifyToken(req.params.token);
  res.cookie("token", token, { maxAge: 3600000, httpOnly: true });
  if (token) {
    next();
  } else {
    res.render("errorExpiredToken");
  }
};

export { checkResetToken };
