import express from "express";
import { productManager } from "./ProductManager.js";

const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.get("/products", async (req, res) => {
  const limit = req.query.limit;

  try {
    const products = await productManager.getProducts(limit);

    res.json(products);
  } catch (error) {
    console.log(error);
  }
});

app.get("/products/:id", async (req, res) => {
  const id = req.params.id;

  try {
    const product = await productManager.getProductById(+id);

    res.json(product);
  } catch (error) {
    console.log(error);
  }
});

app.listen(8080, () => {
  console.log("Server running on port 8080");
});
