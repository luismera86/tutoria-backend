import * as productServices from "../services/product.services.js";
import * as cartServices from "../services/cart.services.js";
import * as userServices from "../services/user.services.js";
import * as ticketService from "../services/ticket.services.js";
import * as cartService from "../services/cart.services.js";
import { createHash, isValidPassword } from "../utils/hashPassword.js";
import { generateToken, verifyToken } from "../utils/jwt.js";
import { logger } from "../utils/logger.js";
import { sendLinkResetPassword } from "../utils/sendLinkPasswordMail.js";
import { userDTO } from "../dto/user.dto.js";

const home = async (req, res) => {
  try {
    res.render("login");
  } catch (error) {
    logger.error(error.message);
    res.status(500).json({ error: "Server internal error" });
  }
};

const realTimeProducts = async (req, res) => {
  try {
    res.render("realTimeProducts");
  } catch (error) {
    logger.error(error.message);
    res.status(500).json({ error: "Server internal error" });
  }
};

const chat = async (req, res) => {
  try {
    res.render("chat");
  } catch (error) {
    logger.error(error.message);
    res.status(500).json({ error: "Server internal error" });
  }
};

const products = async (req, res) => {
  try {
    const resProducts = await productServices.getAllProducts(req.query);

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
    logger.error(error.message);
    res.status(500).json({ error: "Server internal error" });
  }
};

const productDetail = async (req, res) => {
  const { pid } = req.params;
  try {
    const product = await productServices.getProductById(pid);
    res.render("itemDetail", product);
  } catch (error) {
    logger.error(error.message);
    res.status(500).json({ error: "Server internal error" });
  }
};

const cartDetail = async (req, res) => {
  const { cid } = req.params;
  try {
    const cart = await cartServices.getCartById(cid);
    if (!cart) return res.status(404).json({ msg: "Carrito no encontrado" });

    res.render("cart", { products: cart.products });
  } catch (error) {
    logger.error(error.message);
    res.status(500).json({ error: "Server internal error" });
  }
};

const viewLogin = async (req, res) => {
  try {
    res.render("login");
  } catch (error) {
    logger.error(error.message);
    res.status(500).json({ error: "Server internal error" });
  }
};

const loginUser = async (req, res) => {
  const { email, password } = req.body;
  try {
    // Verificamos los datos ingresados
    const user = await userServices.getUserByEmail(email);

    if (!user || !isValidPassword(user, password))
      return res.render("login", { error: "Usuario o contraseña incorrectos" });

    const userToken = userDTO(user);

    const token = generateToken(userToken);

    res.cookie("token", token, { maxAge: 3600000, httpOnly: true });

    // Redireccionamos al perfil del usuario
    return res.redirect("/profile");
  } catch (error) {
    logger.error(error.message);
    res.status(500).json({ error: "Server internal error" });
  }
};

const viewRegister = async (req, res) => {
  try {
    res.render("register");
  } catch (error) {
    logger.error(error.message);
    res.status(500).json({ error: "Server internal error" });
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
    await userServices.createUser({
      first_name,
      last_name,
      email,
      age,
      password: createHash(password),
    });

    // Devolvemos el usuario creado
    return res.redirect("/login");
  } catch (error) {
    logger.error(error.message);
    res.status(500).json({ error: "Server internal error" });
  }
};

const viewProfile = async (req, res) => {
  try {
    const { user } = verifyToken(req.cookies.token);

    // Si no hay usuario logueado redireccionamos al login
    if (!user) return res.redirect("/login");

    res.render("profile", { user });
  } catch (error) {
    logger.error(error.message);
    res.status(500).json({ error: "Server internal error" });
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
    logger.error(error.message);
    res.status(500).json({ error: "Server internal error" });
  }
};

const viewResetPassword = async (req, res) => {
  try {
    res.render("resetPassword");
  } catch (error) {
    logger.error(error.message);
    res.status(500).json({ error: "Server internal error" });
  }
};

const resetPassword = async (req, res) => {
  const { email } = req.body;
  try {
    const user = await userServices.getUserByEmail(email);

    if (!user) return res.render("resetPassword", { error: `El usuario con el mail ${email} no existe` });

    // Generamos un token que expira en 1hs
    const token = generateToken({ email }, "1h");

    // Enviamos el mail con el link para resetear la contraseña
    sendLinkResetPassword(token, email);

    res.render("sendMailConfirm", { email });
  } catch (error) {
    logger.error(error.message);
    res.status(500).json({ error: "Server internal error" });
  }
};

const viewChangePassword = async (req, res) => {
  try {
    res.render("changePassword");
  } catch (error) {
    logger.error(error.message);
    res.status(500).json({ error: "Server internal error" });
  }
};

const changePassword = async (req, res) => {
  const { password1, password2 } = req.body;
  try {
    if (password1 !== password2) return res.render("changePassword", { error: "Las contraseñas no coinciden" });

    const email = req.cookies.token.user.email;
    const user = await userServices.getUserByEmail(email);
    if (!user) return res.render("changePassword", { error: `El usuario con el mail ${email} no existe` });
    await user.updateOne({ password: createHash(password1) });
    res.render("changePasswordConfirm", { msg: "Contraseña cambiada con éxito" });
  } catch (error) {
    logger.error(error.message);
    res.status(500).json({ error: "Server internal error" });
  }
};

const generateTicket = async (req, res) => {
  try {
    const user = req.user;
    const cart = await cartService.getCartFromEmail(user.email);
    const data = {
      purchaser: user.email,
      amount: cart.total,
    };
    const ticket = await ticketService.generateTicket(data);

    // todo: redireccionar a la pagina de ticket en los views
    res.status(201).json(ticket);
  } catch (error) {
    logger.error(error.message);
    res.status(500).json({ error: "Server internal error" });
  }
};

const getTicketFromEmail = async (req, res) => {
  try {
    const user = req.user;
    const ticket = await ticketService.getTicketFromEmail(user.email);
    res.status(200).json(ticket);
  } catch (error) {
    logger.error(error.message);
    res.status(500).json({ error: "Server internal error" });
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
  generateTicket,
  getTicketFromEmail,
  changePassword,
  viewChangePassword,
};
