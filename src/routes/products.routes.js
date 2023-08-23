import { Router } from "express";

import { productManagerDB } from "../dao/managers/mongoDBManagers/product.manager.js";

const routerProducts = Router();

routerProducts.get("/", async (req, res) => {
  const { limit, page, sort, category, status } = req.query;

  try {
    const options = {
      limit: limit || 10,
      page: page || 1,
      sort: {
        price: sort === "asc" ? 1 : -1,
      },
      lean: true,
    };

    if (status != undefined) {
      const resProducts = await productManagerDB.getAllProducts({ status: status }, options);
      return res.json({ resProducts });
    }

    if (category != undefined) {
      const resProducts = await productManagerDB.getAllProducts({ category: category }, options);
      return res.json({ resProducts });
    }

    const resProducts = await productManagerDB.getAllProducts({}, options);
    console.log(resProducts);
    const { totalPages, docs, hasPrevPage, hasNextPage, prevPage, nextPage } = resProducts;
    res.status(200).json( {
      status: "success",
      products: docs,
      totalPages,
      prevPage,
      nextPage,
      page: resProducts.page,
      hasPrevPage,
      hasNextPage,
      prevLink: `http://localhost:8080/products?page=${prevPage}`,
      nextLink: `http://localhost:8080/products?page=${nextPage}`,
    });
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
    const resProducts = await productManagerDB.addProduct(body);

    res.status(200).json(resProducts);
  } catch (error) {
    console.log(error);
  }
});

routerProducts.put("/:id", async (req, res) => {
  const { id } = req.params;
  const body = req.body;

  try {
    await productManagerDB.updateProduct(id, body);
    const product = await productManagerDB.getProductById(id);

    res.status(200).json({
      msg: "Producto actualizado",
      product,
    });
  } catch (error) {
    console.log(error);
  }
});

routerProducts.delete("/:id", async (req, res) => {
  const { id } = req.params;
  try {
    await productManagerDB.deleteProduct(id);
    res.status(200).json({ msg: "Producto eliminado" });
  } catch (error) {
    console.log(error);
  }
});

export { routerProducts };
