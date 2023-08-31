import * as productDao from "../dao/mongo/product.dao.js";

// Llamamos todos los productos
const getAllProducts = async (query, options) => {
  const products = await productDao.getAllProducts(query, options);
  return products;
};

// Llamamos un producto por su id
const getProductById = async (id) => {
  const productFind = await productDao.getProductById(id);
  return productFind;
};

// Agregamos un producto a nuestra base de datos
const addProduct = async (product) => {
  const newProduct = await productDao.addProduct(product);
  return newProduct;
};

// Actualizamos un producto
const updateProduct = async (id, data) => {
  const productUpdate = await productDao.updateProduct(id, data);
  return productUpdate;
};

// Eliminamos un producto
const deleteProduct = async (id) => {
  const productDelete = await productDao.deleteProduct(id);

  return productDelete;
};

export { addProduct, updateProduct, deleteProduct, getAllProducts, getProductById };
