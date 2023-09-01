import { Router } from "express";
import passport from "passport";
import { current, github, login, logout } from "../controllers/session.controllers.js";
import { isLogin } from "../middlewares/checkUser.js";

const routerSessions = Router();

routerSessions.post("/login", passport.authenticate("login", { failureRedirect: "faillogin" }), login);

routerSessions.get("/faillogin", (req, res) => {
  res.send({ error: "Error credenciales inválidas" });
});

routerSessions.post("/logout", logout);

routerSessions.post(
  "/register",
  passport.authenticate("register", { failureRedirect: "failregister" }),
  async (req, res) => {
    res.send({ status: "success", message: "Usuario registrado" });
  }
);

routerSessions.get("/failregister", (req, res) => {
  res.status(401).send({ status: "error", message: "Error al registrar el usuario" });
});

routerSessions.get("/github", passport.authenticate("github", { scope: ["user:email"] }), async (req, res) => {});

routerSessions.get("/githubcallback", passport.authenticate("github", { failureRedirect: "login" }), github);

routerSessions.get("/current", isLogin, current);

export { routerSessions };
