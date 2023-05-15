// Importamos nuestros modelo de producto para trabajar sobre el con los métodos de mongoose

import ProductModel from '../../models/product.model.js';

export class ProductManagerDB {
  // Llamamos todos los productos
  async getAllProducts(limit = 10, page = 1, query, sort = "asc") {
    
    // query tiene que poder buscarse por categoría o por disponibilidad de productos de acuerdo con su stock 
    // el ordenamiento ascendente o descendente es en base al precio
    
    const products = await ProductModel.paginate({ query }, { limit, page, price: sort, lean: true });
    
    return products;
  }

  // Llamamos los productos por límite
  // async getProductsLimit(limit = 10) {
  //   const products = await ProductModel.paginate({}, { limit }, { learn: true });
  //   console.log(products.limit);
  //   return products;
  // }

  // Llamamos los productos por orden de precio
  async getProductsSort(sort) {
    const products = await ProductModel.find().sort({ price: sort });
    return products;
  }

  // Llamamos los productos filtrados por una query
  async getProductsQuery(query) {
    const products = await ProductModel.find({ query });
    return products;
  }

  // Llamamos un producto por su id
  async getProductById(id) {
    const productFind = await ProductModel.findOne({ _id: id });
    if (!productFind) return `No se encuentra el producto con el id ${id}`;
    return productFind;
  }

  // Agregamos un producto a nuestra base de datos
  async addProduct(product) {
    const { title, price, description, thumbnail, status, stock, code, category } = product;

    const checkProductInfo = Object.values(product).includes(undefined);

    if (checkProductInfo) return 'Faltan propiedades al producto';

    const newProduct = await ProductModel.create(product);
    return newProduct;
  }

  // Actualizamos un producto
  async updateProduct(id, data) {
    const productUpdate = await ProductModel.updateOne({ _id: id }, data);
    return productUpdate;
  }

  // Eliminamos un producto
  async deleteProduct(id) {
    const productDelete = await ProductModel.deleteOne({ _id: id });

    return productDelete;
  }
}
