import { Router } from "express";
import { userManager } from "../dao/managers/mongoDBManagers/user.manager.js";

const routerSessions = Router();

routerSessions.post("/login", async (req, res) => {
  const { email, password } = req.body;

  try {
    // Verificamos los datos ingresados
    const user = await userManager.getUserByEmail(email);
    if (!user || user.password !== password) {
      return res.status(404).json({ error: "Usuario o contraseña incorrectos" });
    }
    
    const { first_name, last_name, age, email: emailUser } = user
    // Verificamos si el usuario es administrador le asignamos el rol de admin sino le asignamos el rol de user
    if (email === "adminCoder@coder.com" || password === "adminCod3r123") {
      req.session.user = {
        first_name,
        last_name,
        age,
        email: emailUser,
        role: "admin",
      };
    } else {
      req.session.user = {
        first_name,
        last_name,
        age,
        email: emailUser,
        role: "user",
      };
    }
   
    // Devolvemos el usuario logueado
    return res.json({ user: req.session.user });
  } catch (error) {
    console.log(error);
  }
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

routerSessions.post("/register", async (req, res) => {
  const { first_name, last_name, age, email, password } = req.body;
  try {
    // Verificamos si el usuario ya existe
    const user = await userManager.getUserByEmail(email);
    if (user) {
      return res.status(404).json({ error: `El usuario con el mail ${email} ya existe` });
    }

    // Verificamos que ingreso todos los datos
    if (!first_name || !last_name || !age || !email || !password) {
      return res.status(404).json({ error: "Debe ingresar todos los datos" });
    }


    // Creamos el usuario
    const newUser = await userManager.createUser({
      first_name,
      last_name,
      email,
      age,
      password,
    });

    // Devolvemos el usuario creado
    return res.json({ user: newUser });
  } catch (error) {
    console.log(error);
  }

  
});

export { routerSessions };
