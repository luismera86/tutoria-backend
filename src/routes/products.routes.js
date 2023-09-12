import { Router } from "express";

import {
  addProduct,
  deleteProduct,
  generateMockingProducts,
  getAllProducts,
  getProductById,
  updateProduct,
} from "../controllers/product.controllers.js";
import { isAuthorize, isOwnerAuthorized } from "../middlewares/checkUser.js";
import { checkMongoId } from "../middlewares/checkMongoId.js";

const routerProducts = Router();
routerProducts.get("/mockingporducts", generateMockingProducts);

routerProducts.get("/", getAllProducts);

routerProducts.get("/:id", checkMongoId, getProductById);

routerProducts.post("/", isAuthorize, addProduct);

routerProducts.put("/:id", checkMongoId, isAuthorize, updateProduct);

routerProducts.delete("/:id", checkMongoId, isAuthorize, isOwnerAuthorized, deleteProduct);


export { routerProducts };
