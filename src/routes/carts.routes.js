import { Router } from "express";
import {
  addCart,
  addProductToCart,
  deleteAllProductsFromCart,
  deleteCart,
  deleteProductFromCart,
  getAllCarts,
  getCartById,
  updateProductQuantityFromCart,
  updateProductsFromCart,
} from "../controllers/cart.controllers.js";

const routerCarts = Router();

// Llamamos todos los carritos
routerCarts.get("/", getAllCarts);

// Llamamos un carrito por su id
routerCarts.get("/:cid", getCartById);

// Agregamos un carrito
routerCarts.post("/", addCart);

// Agregamos un producto a un carrito
routerCarts.post("/:cid/products/:pid", addProductToCart);

// Eliminamos un carrito
routerCarts.delete("/:cid", deleteCart);

// Eliminamos todos los productos de un carrito
routerCarts.delete("/:cid/products", deleteAllProductsFromCart);

// Eliminamos un producto de un carrito
routerCarts.delete("/:cid/products/:pid", deleteProductFromCart);

// Actualizamos un carrito
routerCarts.put("/:cid", updateProductsFromCart);

// Actualizamos la cantidad de un producto en el carrito
routerCarts.put("/:cid/products/:pid", updateProductQuantityFromCart);

export { routerCarts };
