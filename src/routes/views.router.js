import { Router } from "express";
import { productManagerDB } from "../dao/managers/mongoDBManagers/product.manager.js";
import { cartManagerDB } from "../dao/managers/mongoDBManagers/cart.manager.js";

const routerViews = Router();

routerViews.get("/", async (req, res) => {
  try {
    const products = await productManagerDB.getAllProducts();

    res.render("home");
  } catch (error) {
    console.log(error);
  }
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

routerViews.get("/products", async (req, res) => {
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
    res.render("products", {
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

routerViews.get("/product/:pid", async (req, res) => {
  const { pid } = req.params;
  try {
    const product = await productManagerDB.getProductById(pid);
    console.log(product);

    res.render("itemDetail", product);
  } catch (error) {
    console.log(error);
  }
});

routerViews.get("/cart/:cid", async (req, res) => {
  const { cid } = req.params;
  try {
    const cart = await cartManagerDB.getCartById(cid);
    console.log(cart);

    res.render("cart", cart);
  } catch (error) {
    console.log(error);
  }
})

export { routerViews };
