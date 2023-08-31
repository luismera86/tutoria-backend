import { productModel } from "../models/product.model.js";

// Llamamos todos los productos
const getAllProducts = async (query, options) => {
  const products = await productModel.paginate(query, options);
  return products;
};

// Llamamos un producto por su id
const getProductById = async (id) => {
  const productFind = await productModel.findOne({ _id: id });
  return productFind;
};

// Agregamos un producto a nuestra base de datos
const addProduct = async (product) => {
  const checkProductInfo = Object.values(product).includes(undefined);

  if (checkProductInfo) return "Faltan propiedades al producto";

  const newProduct = await productModel.create(product);
  return newProduct;
};

// Actualizamos un producto
const updateProduct = async (id, data) => {
  const productUpdate = await productModel.updateOne({ _id: id }, data);
  return productUpdate;
};

// Eliminamos un producto
const deleteProduct = async (id) => {
  const productDelete = await productModel.deleteOne({ _id: id });

  return productDelete;
};

export { addProduct, updateProduct, deleteProduct, getAllProducts, getProductById };
