import { Router } from "express";
import passport from "passport";

const routerSessions = Router();

routerSessions.post("/login", passport.authenticate("login", { failureRedirect: "faillogin" }), async (req, res) => {
  if (!req.user) return res.status(400).send({ status: "error", message: "Error credenciales inválidas" });
  const { first_name, last_name, age, email } = req.user;

  req.session.user = {
    first_name,
    last_name,
    age,
    email,
  };

  res.send({ status: "success", payload: req.user });
});

routerSessions.get("/faillogin", (req, res) => {
  res.send({ error: "Error credenciales inválidas" });
});

routerSessions.post("/logout", async (req, res) => {
  try {
    // Destruimos la sesión
    req.session.destroy((err) => {
      if (err) {
        return res.status(500).json({ error: "Error al cerrar sesión" });
      }
      // Devolvemos el mensaje de sesión cerrada
      res.json({ message: "Sesión cerrada" });
    });
  } catch (error) {
    console.log(error);
  }
});

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

routerSessions.get("/github", passport.authenticate("github", { scope: ["user:email"] }), async (req, res) => { });

routerSessions.get("/githubcallback", passport.authenticate("github", { failureRedirect: "login" }), async (req, res) => {
  req.session.user = req.user;
  res.redirect("/profile");
});

export { routerSessions };

