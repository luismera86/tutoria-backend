import { Router } from "express";

import { addProduct, deleteProduct, getAllProducts, getProductById, updateProduct } from "../controllers/product.controllers.js";

const routerProducts = Router();

routerProducts.get("/", getAllProducts);

routerProducts.get("/:id", getProductById);

routerProducts.post("/", addProduct);

routerProducts.put("/:id", updateProduct);

routerProducts.delete("/:id", deleteProduct);

export { routerProducts };

