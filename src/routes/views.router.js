import { Router } from "express";
import { cartManagerDB } from "../dao/managers/mongoDBManagers/cart.manager.js";
import { productManagerDB } from "../dao/managers/mongoDBManagers/product.manager.js";
import { userManager } from "../dao/managers/mongoDBManagers/user.manager.js";
import { createHash, isValidPassword } from "../utils/hashPassword.js";

const routerViews = Router();

routerViews.get("/", async (req, res) => {
  try {
    const products = await productManagerDB.getAllProducts();

    res.render("home");
  } catch (error) {
    console.log(error);
  }
});

routerViews.get("/realtimeproducts", async (req, res) => {
  try {
    res.render("realTimeProducts");
  } catch (error) {
    console.log(error);
  }
});
routerViews.get("/chat", async (req, res) => {
  try {
    res.render("chat");
  } catch (error) {
    console.log(error);
  }
});

routerViews.get("/products", async (req, res) => {
  const { limit, page, sort, category, status } = req.query;

  try {
    const options = {
      limit: limit || 10,
      page: page || 1,
      sort: {
        price: sort === "asc" ? 1 : -1,
      },
      lean: true,
    };

    if (status != undefined) {
      const resProducts = await productManagerDB.getAllProducts({ status: status }, options);
      return res.json({ resProducts });
    }

    if (category != undefined) {
      const resProducts = await productManagerDB.getAllProducts({ category: category }, options);
      return res.json({ resProducts });
    }

    const resProducts = await productManagerDB.getAllProducts({}, options);

    const { totalPages, docs, hasPrevPage, hasNextPage, prevPage, nextPage } = resProducts;
    res.render("products", {
      status: "success",
      products: docs,
      totalPages,
      prevPage,
      nextPage,
      page: resProducts.page,
      hasPrevPage,
      hasNextPage,
      prevLink: `http://localhost:8080/products?page=${prevPage}`,
      nextLink: `http://localhost:8080/products?page=${nextPage}`,
    });
  } catch (error) {
    console.log(error);
  }
});

routerViews.get("/product/:pid", async (req, res) => {
  const { pid } = req.params;
  try {
    const product = await productManagerDB.getProductById(pid);
    console.log(product);

    res.render("itemDetail", product);
  } catch (error) {
    console.log(error);
  }
});

routerViews.get("/cart/:cid", async (req, res) => {
  const { cid } = req.params;
  try {
    const cart = await cartManagerDB.getCartById(cid);
    if (!cart) return res.status(404).json({ msg: "Carrito no encontrado" });

    res.render("cart", { products: cart.products });
  } catch (error) {
    console.log(error);
  }
});

// Vista de login
routerViews.get("/login", async (req, res) => {
  try {
    res.render("login");
  } catch (error) {
    console.log(error);
  }
});

routerViews.post("/login", async (req, res) => {
  const { email, password } = req.body;
  try {
    // Verificamos los datos ingresados
    const user = await userManager.getUserByEmail(email);
  
    if (!user || !isValidPassword(user, password)) return res.render("login", { error: "Usuario o contraseña incorrectos" });

    const { first_name, last_name, age, email: emailUser } = user;
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

    // Redireccionamos al perfil del usuario
    return res.redirect("/profile");
  } catch (error) {
    console.log(error);
  }
});

// Vista de registro
routerViews.get("/register", async (req, res) => {
  try {
    res.render("register");
  } catch (error) {
    console.log(error);
  }
});

routerViews.post("/register", async (req, res) => {
  const { first_name, last_name, age, email, password } = req.body;
  try {
    // Verificamos si el usuario ya existe
    const user = await userManager.getUserByEmail(email);
    if (user) {
      return res.render("register", { error: `El usuario con el mail ${email} ya existe` });
    }

    // Verificamos que ingreso todos los datos
    if (!first_name || !last_name || !age || !email || !password) {
      return res.render("register", { error: "Debe ingresar todos los datos" });
    }

    // Creamos el usuario
    const newUser = await userManager.createUser({
      first_name,
      last_name,
      email,
      age,
      password: createHash(password),
    });

    // Devolvemos el usuario creado
    return res.redirect("/login");
  } catch (error) {
    console.log(error);
  }
});

// Vista de perfil
routerViews.get("/profile", async (req, res) => {
  try {
    const { user } = req.session;

    // Si no hay usuario logueado redireccionamos al login
    if (!user) return res.redirect("/login");

    res.render("profile", { user });
  } catch (error) {
    console.log(error);
  }
});

// Cerrar sesión
routerViews.get("/logout", async (req, res) => {
  try {
    // Destruimos la sesión
    req.session.destroy((err) => {
      if (err) {
        return res.status(500).json({ error: "Error al cerrar sesión" });
      }
      // Redireccionamos al login
      res.redirect("/login");
    });
  } catch (error) {
    console.log(error);
  }
});

// Vista restaurar contraseña
routerViews.get("/resetpassword", async (req, res) => {
  try {
    res.render("resetPassword");
  } catch (error) {
    console.log(error);
  }
});

routerViews.post("/resetpassword", async (req, res) => {
  const { email, password } = req.body;
  try {
    
    const user = await userManager.getUserByEmail(email);
    if (!user) return res.render("resetPassword", { error: `El usuario con el mail ${email} no existe` });

    // Actualizamos la contraseña
    await userManager.changePassword(email, createHash(password));

    res.redirect("/login");
    
  } catch (error) {
    console.log(error);
  }
});

export { routerViews };

