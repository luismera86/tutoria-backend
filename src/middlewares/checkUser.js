
const isAuthorize = (req, res, next) => {
  if (req.user.role === "admin") {
    next();
  } else {
    res.status(403).send({ error: "No tiene permisos para realizar esta acción" });
  }
}

export { isAuthorize };