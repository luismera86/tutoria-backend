import passport from "passport";
import GitHubStrategy from "passport-github2";
import local from "passport-local";
import { createHash, isValidPassword } from "../utils/hashPassword.js";
import * as userServices from "../services/user.services.js";
import * as cartServices from "../services/cart.services.js";
import { logger } from "../utils/logger.js";

const LocalStrategy = local.Strategy;
const initializePassport = () => {
  passport.use(
    "register",

    new LocalStrategy({ passReqToCallback: true, usernameField: "email" }, async (req, username, password, done) => {
      const { first_name, last_name, age, email, role } = req.body;

      try {
        let user = await userServices.getUserByEmail(username);
        if (user) {
          // null significa que no hay error y el false que no se pudo crear el usuario
          return done(null, false);
        }

        // Creamos una carrito para el usuario
        const cart = await cartServices.addCart();

        const newUser = {
          first_name,
          last_name,
          age,
          email,
          cart: cart._id,
          password: createHash(password),
          role,
        };

        let result = await userServices.createUser(newUser);
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
    let user = await userServices.getUserById(id);
    done(null, user);
  });

  passport.use(
    "login",
    new LocalStrategy({ usernameField: "email" }, async (username, password, done) => {
      try {
        const user = await userServices.getUserByEmail(username);
        if (!user) {
          logger.error(`El usuario con el mail ${username} no existe`);
          return done(null, false);
        }

        if (!isValidPassword(user, password)) return done(null, false);

        return done(null, user);
      } catch (error) {
        return done("Error al obtener el usuario" + error);
      }
    })
  );

  passport.use(
    "github",
    new GitHubStrategy(
      {
        clientID: "Iv1.814560a633c59c16",
        clientSecret: "ba3be6257acd5acdab77c80adc88551d6fdecbe4",
        callbackURL: "http://localhost:8080/api/sessions/githubcallback",
      },
      async (accessToken, refreshToken, profile, done) => {
        try {
          const user = await userServices.getUserByEmail(profile._json.email);
          if (!user) {
            // Si el email viene en null o undefined, le asignamos el id de github
            const email = profile._json.email || profile._json.id;
            const newUser = {
              first_name: profile._json.name,
              last_name: "",
              age: 18,
              email,
              password: "",
            };
            const result = await userServices.createUser(newUser);
            return done(null, result);
          }

          return done(null, user);
        } catch (error) {
          return done("Error al obtener el usuario" + error);
        }
      }
    )
  );
};

export { initializePassport };
