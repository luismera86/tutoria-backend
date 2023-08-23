import { Router } from "express";
import { cartManagerDB } from "../dao/managers/mongoDBManagers/cart.manager.js";

const routerCarts = Router();

routerCarts.get("/", async (req, res) => {
  try {
    const carts = await cartManagerDB.getAllCarts();
    res.status(200).json(carts);
  } catch (error) {
    console.log(error);
  }
});

routerCarts.get("/:id", async (req, res) => {
  const { id } = req.params;
  try {
    const cart = await cartManagerDB.getCartById(id);
    res.status(200).json(cart);
  } catch (error) {
    console.log(error);
  }
});

routerCarts.post("/", async (req, res) => {
  try {
    const carts = await cartManagerDB.addCart();
    res.status(200).json(carts);
  } catch (error) {
    console.log(error);
  }
});

routerCarts.post("/:idCart/product/:idProduct", async (req, res) => {
  const { idCart, idProduct } = req.params;
  try {
    // ! Tener en cuenta las posición en que envía los id, hay que respetar como se implemento en el método
    await cartManagerDB.addProductToCart(idCart, idProduct);

    res.status(200).json({ msg: "Producto agregado al carrito" });
  } catch (error) {
    console.log(error);
  }
});

routerCarts.delete("/:id", async (req, res) => {
  const { id } = req.params;
  try {
    const carts = await cartManagerDB.deleteCart(id);

    res.status(200).json(carts);
  } catch (error) {
    console.log(error);
  }
});

routerCarts.get("/", async (req, res) => {
  try {
    const carts = await cartManagerDB.getAllCarts();

    res.status(200).json(carts);
  } catch (error) {
    console.log(error);
  }
});

export { routerCarts };
