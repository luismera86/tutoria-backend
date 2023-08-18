import { Router } from "express";
import { productsManager } from "../managers/productsManager.js";

const routerViews = Router();

routerViews.get("/", async (req, res) => {
  const products = await productsManager.getAllProducts();

  res.render("home", { products });
});

routerViews.get("/realtimeproducts", async (req, res) => {
  try {
    const products = await productsManager.getAllProducts();
    res.render("realTimeProducts", { products });
  } catch (error) {
    console.log(error);
  }
});

routerViews.post("/realtimeproducts", async (req, res) => {
  // Almacenamos en la constante body los datos del req.body recibidos
  const body = req.body;
  // console.log(body);
  try {
    console.log("entro al post");
    const resProducts = await productsManager.addProduct(body);

    res.json({ resProducts });
  } catch (error) {
    console.log(error);
  }
});

export { routerViews };
