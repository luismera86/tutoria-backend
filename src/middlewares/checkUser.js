import * as productServices from "../services/product.services.js";

const isAuthorize = (req, res, next) => {
  if (!req.user) return res.status(403).json({ error: "No tiene permisos para realizar esta acción" });
  if (req.user.role === "admin" || req.user.role === "premium") {
    next();
  } else {
    return res.status(403).json({ error: "No tiene permisos para realizar esta acción" });
  }
};

const isOwnerAuthorized = async (req, res, next) => {
  const { id } = req.params;
  const product = await productServices.getProductById(id);
  const user = req.session.user;
  if (product.owner === user.email || user.role === "admin") {
    next();
  } else {
    res.status(403).json({ error: "No tiene permisos para realizar esta acción" });
  }
};

const isLogin = (req, res, next) => {
  if (req.session.user) {
    next();
  } else {
    res.status(403).json({ error: "Usuario no logueado" });
  }
};

const isUserAuthorized = (req, res, next) => {
  if (req.user.role === "user" || req.user.role === "premium") {
    next();
  } else {
    res.status(403).json({ error: "No tiene permisos para realizar esta acción" });
  }
};

export { isAuthorize, isLogin, isUserAuthorized, isOwnerAuthorized };
