// Importamos nuestros modelo de producto para trabajar sobre el con los métodos de mongoose
import { productModel } from "../../models/product.model.js";

class ProductManagerDB {
  // Llamamos todos los productos
  async getAllProducts(query, options) {
    const products = await productModel.paginate(query, options);
    return products;
  }

  // Llamamos un producto por su id
  async getProductById(id) {
    const productFind = await productModel.findOne({ _id: id });
    return productFind;
  }

  // Agregamos un producto a nuestra base de datos
  async addProduct(product) {
    const checkProductInfo = Object.values(product).includes(undefined);

    if (checkProductInfo) return "Faltan propiedades al producto";

    const newProduct = await productModel.create(product);
    return newProduct;
  }

  // Actualizamos un producto
  async updateProduct(id, data) {
    const productUpdate = await productModel.updateOne({ _id: id }, data);
    return productUpdate;
  }

  // Eliminamos un producto
  async deleteProduct(id) {
    const productDelete = await productModel.deleteOne({ _id: id });

    return productDelete;
  }
}

export const productManagerDB = new ProductManagerDB();
