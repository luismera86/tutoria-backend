import { Router } from "express";
import { productsManager } from "../managers/productsManager.js";

const routerViews = Router();

routerViews.get("/", async (req, res) => {

  const products = await productsManager.getAllProducts();

  res.render("home", { products });
});

export { routerViews };
