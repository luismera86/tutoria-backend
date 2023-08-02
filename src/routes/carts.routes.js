/* 
  Al haber detallado en el archivo products.routes.js no voy a repetir los mismos detalles
  salvo en el método de agregar un producto al carrito que tiene una particularidad
*/

import { Router } from "express";
import { cartManager } from "../managers/cartManager.js";

const routerCarts = Router();

routerCarts.get("/", async (req, res) => {
  try {
    const carts = await cartManager.getAllCarts();
    res.status(200).json(carts);
  } catch (error) {
    console.log(error);
  }
});

routerCarts.get("/:id", async (req, res) => {
  const { id } = req.params;
  try {
    const cart = await cartManager.getCartById(parseInt(id));
    res.status(200).json(cart);
  } catch (error) {
    console.log(error);
  }
});

routerCarts.post("/", async (req, res) => {
  try {
    const carts = await cartManager.createCart();
    res.status(200).json(carts);
  } catch (error) {
    console.log(error);
  }
});

/* 
  Método post
  En este endpoint vamos a agregar un producto especifico en un carrito especifico
  para ello recibimos dos params, para ello introducimos dos alias, uno para cada id 
  en una posición diferente de la ruta
*/
routerCarts.post("/:idCart/product/:idProduct", async (req, res) => {
  // Desestructuramos de los req.params los dos alias asignados
  const { idCart, idProduct } = req.params;
  try {
    // Llamamos al método addProductToCart y recordemos que los params llegan como tipo string
    // tenemos que pasarlos a tipo number con parseInt()
    // ! Tener en cuenta las posición en que envía los id, hay que respetar como se implemento en el método
    const carts = await cartManager.addProductToCart(parseInt(idCart), parseInt(idProduct));

    // El servidor envía la respuesta de método addProductToCart
    res.status(200).json(carts);
  } catch (error) {
    console.log(error);
  }
});

routerCarts.delete("/:id", async (req, res) => {
  const { id } = req.params;
  try {
    const carts = await cartManager.deleteCart(parseInt(id));

    res.status(200).json(carts);
  } catch (error) {
    console.log(error);
  }
});

routerCarts.get("/", async (req, res) => {
  try {
    const carts = await cartManager.getAllCarts();

    res.status(200).json(carts);
  } catch (error) {
    console.log(error);
  }
});

export { routerCarts };
