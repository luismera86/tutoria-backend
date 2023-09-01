const isAuthorize = (req, res, next) => {
  if (req.user.role === "admin") {
    next();
  } else {
    res.status(403).send({ error: "No tiene permisos para realizar esta acción" });
  }
};

const isLogin = (req, res, next) => {
  if (req.session.user) {
    next();
  } else {
    res.status(403).send({ error: "Usuario no logueado" });
  }
};

const isUserAuthorized = (req, res, next) => {
  if (req.user.role === "user") {
    next();
  } else {
    res.status(403).send({ error: "No tiene permisos para realizar esta acción" });
  }
};

export { isAuthorize, isLogin, isUserAuthorized };
