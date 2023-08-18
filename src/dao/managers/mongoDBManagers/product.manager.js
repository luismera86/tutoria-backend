// Importamos nuestros modelo de producto para trabajar sobre el con los métodos de mongoose
import Product from "../../models/product.model.js";

class ProductManagerDB {
  // Llamamos todos los productos
  async getAllProducts() {
    const products = await Product.find();
    return products;
  }

  // Llamamos un producto por su id
  async getProductById(id) {
    const productFind = await Product.findOne({ _id: id });
    if (!productFind) return `No se encuentra el producto con el id ${id}`;
    return productFind;
  }

  // Agregamos un producto a nuestra base de datos
  async addProduct(product) {
    const { title, price, description, thumbnail, status, stock, code, category } = product;

    const checkProductInfo = Object.values(product).includes(undefined);

    if (checkProductInfo) return "Faltan propiedades al producto";

    const newProduct = await Product.create(product);
    return newProduct;
  }

  // Actualizamos un producto
  async updateProduct(id, data) {
    const productUpdate = await Product.updateOne({ _id: id }, data);
    return productUpdate;
  }

  // Eliminamos un producto
  async deleteProduct(id) {
    const productDelete = await Product.deleteOne({ _id: id });

    return productDelete;
  }
}

export const productManagerDB = new ProductManagerDB();