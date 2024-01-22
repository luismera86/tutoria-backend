import { Router } from "express";
import {
  cartDetail,
  changePassword,
  chat,
  home,
  loginUser,
  logoutUser,
  productDetail,
  products,
  realTimeProducts,
  registerUser,
  resetPassword,
  viewChangePassword,
  viewLogin,
  viewProfile,
  viewRegister,
  viewResetPassword,
  addProductToCart,
  buyCart
} from "../controllers/views.controllers.js";
import { checkResetToken } from "../middlewares/checkResetToken.js";
import { checkToken } from "../middlewares/checkToken.js";

const routerViews = Router();

routerViews.get("/", home);

routerViews.get("/realtimeproducts", realTimeProducts);

routerViews.get("/chat", chat);

routerViews.get("/products", checkToken, products);

routerViews.get("/product/:pid", checkToken, productDetail);

routerViews.get("/cart/:cid", checkToken, cartDetail);


// TODO: Agregar la ruta para añadir productos al carrito
routerViews.post("/cart/:pid", checkToken, addProductToCart);
// TODO: Agregar la ruta para la compra de productos
routerViews.post("/cart/buy/:cid", checkToken, buyCart);


// Vista de login
routerViews.get("/login", viewLogin);

routerViews.post("/login", loginUser);

// Vista de registro
routerViews.get("/register", viewRegister);

routerViews.post("/register", registerUser);

// Vista de perfil
routerViews.get("/profile", checkToken, viewProfile);

// Cerrar sesión
routerViews.get("/logout", checkToken, logoutUser);

// Vista restaurar contraseña
routerViews.get("/resetpassword", viewResetPassword);
routerViews.post("/resetpassword", resetPassword);

// Vista cambiar contraseña
routerViews.get("/changepassword/:token", checkResetToken, viewChangePassword);
routerViews.post("/changepassword", changePassword);

// Documentación de la API
// routerViews.get("/docs", swaggerUiExpress.serve, swaggerUiExpress.setup(specs));

export { routerViews };

