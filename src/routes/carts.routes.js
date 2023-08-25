import { Router } from "express";
import { cartManagerDB } from "../dao/managers/mongoDBManagers/cart.manager.js";
import { productManagerDB } from "../dao/managers/mongoDBManagers/product.manager.js";

const routerCarts = Router();

// Llamamos todos los carritos
routerCarts.get("/", async (req, res) => {
  try {
    const carts = await cartManagerDB.getAllCarts();
    res.status(200).json(carts);
  } catch (error) {
    console.log(error);
  }
});

// Llamamos un carrito por su id
routerCarts.get("/:cid", async (req, res) => {
  const { cid } = req.params;
  try {
    // Buscamos si existe el carrito y el producto en la base de datos
    const cart = await cartManagerDB.getCartById(cid);
    if (!cart) return res.status(404).json({ msg: "Carrito no encontrado" });

    res.status(200).json(cart);
  } catch (error) {
    console.log(error);
  }
});

// Agregamos un carrito
routerCarts.post("/", async (req, res) => {
  try {
    const carts = await cartManagerDB.addCart();
    res.status(200).json(carts);
  } catch (error) {
    console.log(error);
  }
});

// Agregamos un producto a un carrito
routerCarts.post("/:cid/products/:pid", async (req, res) => {
  const { cid, pid } = req.params;
  try {
    // Buscamos si existe el carrito y el producto en la base de datos
    const cart = await cartManagerDB.getCartById(cid);
    if (!cart) return res.status(404).json({ msg: "Carrito no encontrado" });

    const product = await productManagerDB.getProductById(pid);
    if (!product) return res.status(404).json({ msg: "Producto no encontrado" });

    await cartManagerDB.addProductToCart(cid, pid);

    res.status(200).json({ msg: "Producto agregado al carrito" });
  } catch (error) {
    console.log(error);
  }
});

// Eliminamos un carrito
routerCarts.delete("/:cid", async (req, res) => {
  const { cid } = req.params;
  try {
    // Buscamos si existe el carrito
    const cart = await cartManagerDB.getCartById(cid);
    if (!cart) return res.status(404).json({ msg: "Carrito no encontrado" });

    await cartManagerDB.deleteCart(id);

    res.status(200).json({ msg: "Carrito eliminado" });
  } catch (error) {
    console.log(error);
  }
});

// Eliminamos un producto de un carrito
routerCarts.delete("/:cid/products/:pid", async (req, res) => {
  const { cid, pid } = req.params;
  try {
    // Buscamos si existe el carrito y el producto en la base de datos
    const cart = await cartManagerDB.getCartById(cid);
    if (!cart) return res.status(404).json({ msg: "Carrito no encontrado" });

    const product = await productManagerDB.getProductById(pid);
    if (!product) return res.status(404).json({ msg: "Producto no encontrado" });

    // Buscamos si existe el producto en el carrito
    const productInCart = cart.products.find((product) => product.product == pid);
    if (!productInCart) return res.status(404).json({ msg: "Producto no encontrado en el carrito" });

    await cartManagerDB.removeProductFromCart(cid, pid);

    res.status(200).json({ msg: "Producto eliminado del carrito" });
  } catch (error) {
    console.log(error);
  }
});

// Eliminamos todos los productos de un carrito
routerCarts.delete("/:cid/products", async (req, res) => {
  const { cid } = req.params;
  try {
    // Buscamos si existe el carrito y el producto en la base de datos
    const cart = await cartManagerDB.getCartById(cid);
    if (!cart) return res.status(404).json({ msg: "Carrito no encontrado" });

    await cartManagerDB.removeAllProductsFromCart(cid);

    res.status(200).json({ msg: "Productos eliminados del carrito" });
  } catch (error) {
    console.log(error);
  }
});

// Actualizamos un carrito
routerCarts.put("/:cid", async (req, res) => {
  const { cid } = req.params;
  const { products } = req.body;

  try {
    await cartManagerDB.updateCart(cid, products);
    res.status(200).json({ msg: "Carrito actualizado" });
  } catch (error) {
    console.log(error);
  }
});

// Actualizamos la cantidad de un producto en el carrito
routerCarts.put("/:cid/products/:pid", async (req, res) => {
  const { cid, pid } = req.params;
  const { quantity } = req.body;
  try {
    // Buscamos si existe el carrito y el producto en la base de datos
    const cart = await cartManagerDB.getCartById(cid);
    if (!cart) return res.status(404).json({ msg: "Carrito no encontrado" });

    const product = await productManagerDB.getProductById(pid);
    if (!product) return res.status(404).json({ msg: "Producto no encontrado" });

    // Buscamos si existe el producto en el carrito
    const productInCart = cart.products.find((product) => product.product == pid);
    if (!productInCart) return res.status(404).json({ msg: "Producto no encontrado en el carrito" });

    await cartManagerDB.updateProductQuantity(cid, pid, parseInt(quantity));

    res.status(200).json({ msg: `Cantidad de productos actualizada a ${quantity}` });
  } catch (error) {
    console.log(error);
  }
});

export { routerCarts };
