import { Router } from "express";
import {
  addCart,
  addProductInUserCart,
  addProductToCart,
  deleteAllProductsFromCart,
  deleteCart,
  deleteProductFromCart,
  getAllCarts,
  getCartById,
  purchaseCart,
  updateProductQuantityFromCart,
  updateProductsFromCart,
} from "../controllers/cart.controllers.js";
import { isAuthorize, isLogin, isUserAuthorized } from "../middlewares/checkUser.js";

const routerCarts = Router();

// Llamamos todos los carritos
routerCarts.get("/", getAllCarts);

// Llamamos un carrito por su id
routerCarts.get("/:cid", getCartById);

// Agregamos un carrito
routerCarts.post("/", isAuthorize, addCart);

// Agregamos un producto a un carrito
routerCarts.post("/:cid/products/:pid", isLogin, isUserAuthorized, addProductToCart);

routerCarts.post("/products/:pid", isLogin, isUserAuthorized, addProductInUserCart);

// Proceso de compra de un carrito
routerCarts.post("/:cid/purchase", isLogin, purchaseCart);

// Eliminamos un carrito
routerCarts.delete("/:cid", isAuthorize, deleteCart);

// Eliminamos todos los productos de un carrito
routerCarts.delete("/:cid/products", deleteAllProductsFromCart);

// Eliminamos un producto de un carrito
routerCarts.delete("/:cid/products/:pid", deleteProductFromCart);

// Actualizamos un carrito
routerCarts.put("/:cid", updateProductsFromCart);

// Actualizamos la cantidad de un producto en el carrito
routerCarts.put("/:cid/products/:pid", isAuthorize, updateProductQuantityFromCart);

export { routerCarts };
