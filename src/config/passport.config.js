import passport from "passport";
import GitHubStrategy from "passport-github2";
import local from "passport-local";
import { userManager } from "../dao/managers/mongoDBManagers/user.manager.js";
import { createHash, isValidPassword } from "../utils/hashPassword.js";
import { cartManagerDB } from "../dao/managers/mongoDBManagers/cart.manager.js";

const LocalStrategy = local.Strategy;
const initializePassport = () => {
  passport.use(
    "register",

    new LocalStrategy({ passReqToCallback: true, usernameField: "email" }, async (req, username, password, done) => {
      const { first_name, last_name, age, email } = req.body;

      try {
        let user = await userManager.getUserByEmail(username);
        if (user) {
          console.log("El usuario ya existe");
          // null significa que no hay error y el false que no se pudo crear el usuario
          return done(null, false);
        }

        // Creamos una carrito para el usuario
        const cart = await cartManagerDB.addCart();

        const newUser = {
          first_name,
          last_name,
          age,
          email,
          cart: cart._id,
          password: createHash(password),
        };

        let result = await userManager.createUser(newUser);
        // null significa que no hay error y result es el usuario creado
        return done(null, result);
      } catch (error) {
        return done("Error al obtener el usuario" + error);
      }
    })
  );

  passport.serializeUser((user, done) => {
    // null significa que no hay error y user._id es el id del usuario
    done(null, user._id);
  });

  passport.deserializeUser(async (id, done) => {
    let user = await userManager.getUserById(id);
    done(null, user);
  });


  passport.use("login", new LocalStrategy({ usernameField: "email" }, async (username, password, done) => {
    try {
      const user = await userManager.getUserByEmail(username);
      if (!user) {
        console.log("El usuario no existe");
        return done(null, false);
      }

      if (!isValidPassword(user, password)) return done(null, false);

      return done(null, user);

    }
    catch (error) {
      return done("Error al obtener el usuario" + error);
    }
  }));

  passport.use("github", new GitHubStrategy({
    clientID: "Iv1.814560a633c59c16",
    clientSecret: "ba3be6257acd5acdab77c80adc88551d6fdecbe4",
    callbackURL: "http://localhost:8080/api/sessions/githubcallback"
  }, async (accessToken, refreshToken, profile, done) => { 
    try {
     
      const user = await userManager.getUserByEmail(profile._json.email);
      if (!user) {
        // Si el email viene en null o undefined, le asignamos el id de github
        const email = profile._json.email || profile._json.id;
        const newUser = {
          first_name: profile._json.name,
          last_name: "",
          age: 18,
          email,
          password: "",
        }
        const result = await userManager.createUser(newUser);
        return done(null, result);
      }

      return done(null, user);

    }
    catch (error) {
      return done("Error al obtener el usuario" + error);
    }
  }));

};

export { initializePassport };
