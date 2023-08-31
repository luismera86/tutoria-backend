import * as productServices from "../services/product.services.js";
import * as cartServices from "../services/cart.services.js";
import * as userServices from "../services/user.services.js";
import { isValidPassword } from "../utils/hashPassword.js";
import { generateToken, verifyToken } from "../utils/jwt.js";

const home = async (req, res) => {
  try {
    res.render("login");
  } catch (error) {
    console.log(error);
  }
};

const realTimeProducts = async (req, res) => {
  try {
    res.render("realTimeProducts");
  } catch (error) {
    console.log(error);
  }
};

const chat = async (req, res) => {
  try {
    res.render("chat");
  } catch (error) {
    console.log(error);
  }
};

const products = async (req, res) => {
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
      const resProducts = await productServices.getAllProducts({ status: status }, options);
      return res.json({ resProducts });
    }

    if (category != undefined) {
      const resProducts = await productServices.getAllProducts({ category: category }, options);
      return res.json({ resProducts });
    }

    const resProducts = await productServices.getAllProducts({}, options);

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
};

const productDetail = async (req, res) => {
  const { pid } = req.params;
  try {
    const product = await productServices.getProductById(pid);
    console.log(product);

    res.render("itemDetail", product);
  } catch (error) {
    console.log(error);
  }
};

const cartDetail = async (req, res) => {
  const { cid } = req.params;
  try {
    const cart = await cartServices.getCartById(cid);
    if (!cart) return res.status(404).json({ msg: "Carrito no encontrado" });

    res.render("cart", { products: cart.products });
  } catch (error) {
    console.log(error);
  }
};

const viewLogin = async (req, res) => {
  try {
    res.render("login");
  } catch (error) {
    console.log(error);
  }
};

const loginUser = async (req, res) => {
  const { email, password } = req.body;
  try {
    // Verificamos los datos ingresados
    const user = await userServices.getUserByEmail(email);

    if (!user || !isValidPassword(user, password))
      return res.render("login", { error: "Usuario o contraseña incorrectos" });

    const { first_name, last_name, email: emailUser, role } = user;

    const token = generateToken({ first_name, last_name, email: emailUser, role });

    res.cookie("token", token, { maxAge: 3600000, httpOnly: true });

    // Redireccionamos al perfil del usuario
    return res.redirect("/profile");
  } catch (error) {
    console.log(error);
  }
};

const viewRegister = async (req, res) => {
  try {
    res.render("register");
  } catch (error) {
    console.log(error);
  }
};

const registerUser = async (req, res) => {
  const { first_name, last_name, age, email, password } = req.body;
  try {
    // Verificamos si el usuario ya existe
    const user = await userServices.getUserByEmail(email);
    if (user) {
      return res.render("register", { error: `El usuario con el mail ${email} ya existe` });
    }

    // Verificamos que ingreso todos los datos
    if (!first_name || !last_name || !age || !email || !password) {
      return res.render("register", { error: "Debe ingresar todos los datos" });
    }

    // Creamos el usuario
    const newUser = await userServices.createUser({
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
};

const viewProfile = async (req, res) => {
  try {
    const { user } = verifyToken(req.cookies.token);

    // Si no hay usuario logueado redireccionamos al login
    if (!user) return res.redirect("/login");

    res.render("profile", { user });
  } catch (error) {
    console.log(error);
  }
};

const logoutUser = async (req, res) => {
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
};

const viewResetPassword = async (req, res) => {
  try {
    res.render("resetPassword");
  } catch (error) {
    console.log(error);
  }
};

const resetPassword = async (req, res) => {
  const { email, password } = req.body;
  try {
    const user = await userServices.getUserByEmail(email);
    if (!user) return res.render("resetPassword", { error: `El usuario con el mail ${email} no existe` });

    // Actualizamos la contraseña
    await userServices.changePassword(email, createHash(password));

    res.redirect("/login");
  } catch (error) {
    console.log(error);
  }
};

export {
  home,
  realTimeProducts,
  chat,
  products,
  productDetail,
  cartDetail,
  viewLogin,
  loginUser,
  viewRegister,
  registerUser,
  viewProfile,
  logoutUser,
  viewResetPassword,
  resetPassword,
};
