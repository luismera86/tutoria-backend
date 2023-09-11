import { Router } from "express";

import {
  addProduct,
  deleteProduct,
  generateMockingProducts,
  getAllProducts,
  getProductById,
  updateProduct,
} from "../controllers/product.controllers.js";
import { isAuthorize } from "../middlewares/checkUser.js";

const routerProducts = Router();
routerProducts.get("/mockingporducts", generateMockingProducts);

routerProducts.get("/", getAllProducts);

routerProducts.get("/:id", getProductById);

routerProducts.post("/", isAuthorize, addProduct);

routerProducts.put("/:id", isAuthorize, updateProduct);

routerProducts.delete("/:id", isAuthorize, deleteProduct);


export { routerProducts };
