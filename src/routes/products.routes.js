import { Router } from "express";
import { productManagerDB } from "../dao/managers/mongoDBManagers/product.manager.js";

const routerProducts = Router();

routerProducts.get("/", async (req, res) => {
  try {
    const resProducts = await productManagerDB.getAllProducts();

    res.status(200).json(resProducts);
  } catch (error) {
    console.log(error);
  }
});

routerProducts.get("/:id", async (req, res) => {
  const { id } = req.params;
  try {
    const resProduct = await productManagerDB.getProductById(id);

    res.status(200).json(resProduct);
  } catch (error) {
    console.log(error);
  }
});

routerProducts.post("/", async (req, res) => {
  const body = req.body;
  try {
    const resProducts = await productsManager.addProduct(body);

    res.status(200).json(resProducts);
  } catch (error) {
    console.log(error);
  }
});

routerProducts.put("/:id", async (req, res) => {
  const { id } = req.params;
  const body = req.body;

  try {
    const resProducts = await productsManager.updateProduct(id, body);

    res.status(200).json(resProducts);
  } catch (error) {
    console.log(error);
  }
});

routerProducts.delete("/:id", async (req, res) => {
  const { id } = req.params;
  try {
    const resProduct = await productsManager.deleteProduct(id);
    res.status(200).json(resProduct);
  } catch (error) {
    console.log(error);
  }
});

export { routerProducts };
