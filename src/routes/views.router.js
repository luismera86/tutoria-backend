import { Router } from "express";
import { productManagerDB } from "../dao/managers/mongoDBManagers/product.manager.js";

const routerViews = Router();

routerViews.get("/", async (req, res) => {
  const products = await productManagerDB.getAllProducts();

  res.render("home", { products });
});

routerViews.get("/realtimeproducts", async (req, res) => {
  try {
    
    res.render("realTimeProducts");
  } catch (error) {
    console.log(error);
  }
});
routerViews.get("/chat", async (req, res) => {
  try {
    
    res.render("chat");
  } catch (error) {
    console.log(error);
  }
});



export { routerViews };
