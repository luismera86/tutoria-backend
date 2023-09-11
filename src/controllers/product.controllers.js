import * as productServices from "../services/product.services.js";
import { EErrors, customError } from "../utils/customErro.js";
import { generateProducts } from "../utils/generateProducts.js";

const getAllProducts = async (req, res) => {
  try {
    const resProducts = await productServices.getAllProducts(req.query);

    const { totalPages, docs, hasPrevPage, hasNextPage, prevPage, nextPage } = resProducts;
    res.status(200).json({
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
};

const getProductById = async (req, res) => {
  const { id } = req.params;
  try {
    const resProduct = await productServices.getProductById(id);

    res.status(200).json(resProduct);
  } catch (error) {
    console.log(error);
  }
};

const addProduct = async (req, res) => {
  const body = req.body;
  try {
    const resProducts = await productServices.addProduct(body);

    res.status(200).json(resProducts);
  } catch (error) {
    console.log(error);
  }
};

const updateProduct = async (req, res) => {
  const { id } = req.params;
  const body = req.body;

  try {
    await productServices.updateProduct(id, body);
    const product = await productServices.getProductById(id);

    res.status(200).json({
      msg: "Producto actualizado",
      product,
    });
  } catch (error) {
    console.log(error);
  }
};

const deleteProduct = async (req, res) => {
  const { id } = req.params;
  try {
    await productServices.deleteProduct(id);
    res.status(200).json({ msg: "Producto eliminado" });
  } catch (error) {
    console.log(error);
  }
};

const generateMockingProducts = async (req, res) => {
  try {
    const products = generateProducts();
    if(products.length > 1) customError({ name: "Error mock", message: "Error al generar productos de mock", cause: "Error en el servidor", code: EErrors.PRODUCT_NOT_FOUND})
    res.status(200).json(products);
  } catch (error) {
    console.log(error);
    res.status(500).json({ msg: "Error en el servidor" });
  }
};

export { addProduct, deleteProduct, generateMockingProducts, getAllProducts, getProductById, updateProduct };

