/* 

El productManager es muy importante en su proyecto ya que en el se realiza la lógica 
de la manipulación de la información que se transmiten entre cliente-servidor.
En esta etapa es donde nosotros realizamos el CRUD (Create, Read, Update, Delete)
Manejamos la conexión con el método de persistencia de datos, en este caso usamos File System que nos permite
manejar información con texto plano

*/

import fs from "fs";
import { __dirname } from "./util.js";

class ProductManager {
  constructor() {
    this.products = [];
    // Implementamos un path general para toda la clase, es de buenas prácticas realizarlo así, en caso de cambiar
    // la ruta se cambia directamente en todos los lugares que se instancia la clase
    this.path = __dirname + "/data/products.json";
  }

  async addProduct(product) {
    const { title, description, price, thumbnail, code, stock } = product;
    const newProduct = {
      id: this.products.length + 1,
      title,
      description,
      price,
      thumbnail,
      code,
      stock,
    };
    // Validar que no se repita el campo code
    const productExists = this.products.find((p) => p.code === code);
    if (productExists) throw new Error("Ya existe un producto con ese código");

    this.products.push(newProduct);
    await fs.promises.writeFile(this.path, JSON.stringify(this.products));
    return newProduct;
  }

  async getProducts(limit) {
    // leemos todos los productos del archivo json
    const productsJson = await fs.promises.readFile(this.path, "utf-8");

    if (!limit) return JSON.parse(productsJson);

    // Verificamos si el archivo json no está vació, en caso que este vacío retorna un array []
    if (!productsJson.trim()) return [];

    // Chequeamos el limit
    if (limit) {
      // Si el limit es mayor a la cantidad de productos que tenemos, retornamos todos los productos
      if (limit > productsJson.length) return JSON.parse(productsJson);

      // Si el limit es menor a la cantidad de productos que tenemos, retornamos la cantidad de productos que nos piden
      return JSON.parse(productsJson).slice(0, limit);
    }
  }

  async getProductById(id) {
    // Primero llamamos todos los productos
    const products = await this.getProducts();

    // Luego buscamos entre los productos el producto que coincida con el id recibido
    const product = products.find((product) => product.id === id);

    // Si el id enviado no coincide con algún id  de los productos retornamos un mensaje y termina aquí el método
    if (!product) return `No se encontró el producto buscado con el id ${id}`;

    // En caso de que el producto exista retornamos el producto encontrado
    return product;
  }

  async updateProductById(id, product) {
    // Primero llamamos todos los productos
    const products = await this.getProducts();

    // Luego buscamos entre los productos el producto que coincida con el id recibido
    const productIndex = products.findIndex((product) => product.id === id);

    // Si el id enviado no coincide con algún id  de los productos retornamos un mensaje y termina aquí el método
    if (productIndex === -1) return `No se encontró el producto buscado con el id ${id}`;

    // En caso de que el producto exista, actualizamos el producto
    products[productIndex] = { ...product, id };

    // Guardamos en el archivo products.json la información actualizada
    await fs.promises.writeFile(this.path, JSON.stringify(products));

    // Retornamos el array actualizado
    return products;
  }

  async deleteProductById(id) {
    // Llamamos a todos los productos guardados en el archivo json
    const products = await this.getProducts();

    // Luego buscamos entre los productos el producto que coincida con el id recibido
    const product = products.find((product) => product.id === id);

    // Si el id enviado no coincide con algún id  de los productos retornamos un mensaje y termina aquí el método
    if (!product) return `No se encontró el producto buscado con el id ${id}`;

    // Filtramos los productos que no coincidan con el id del producto a eliminar
    const productsFilter = products.filter((product) => product.id !== id);

    // Guardamos en el archivo products.json el nuevo array sin el producto que eliminamos
    await fs.promises.writeFile(this.path, JSON.stringify(productsFilter));

    // Retornamos el array actualizado
    return productsFilter;
  }
}

export const productManager = new ProductManager();
