import { Router } from "express";
import { productsManager } from "../dao/managers/DB/ProductManager.db.js";

const router = Router();
router.get(`/`, async (req, res) => {
  try {
    res.render("chat");
  } catch (error) {
    console.log(error);
  }
});

router.get(`/products`, async (req, res) => {
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
      const resProducts = await products.getAllProducts({ status: status }, options);
      return res.json({ resProducts });
    }

    if (category != undefined) {
      const resProducts = await products.getAllProducts({ category: category }, options);
      return res.json({ resProducts });
    }

    const resProducts = await productsManager.getAllProducts({}, options);
    console.log(resProducts)
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

export default router;
