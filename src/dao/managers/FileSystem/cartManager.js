
/* 

En este archivo no voy repetir la explicación de la lógica utilizada que es la misma 
del ProductManager, sino voy a detallar algunas particularidades del CartManager

*/

import ProductsManager from'./productsManager.js';
import fs from'fs';
import path from"path";
import { __dirname } from '../../../utils.js';

class CartManager {

  // Hacemos una instancia del ProductManager en la clase para poder traer el producto que tenemos que agregar al carrito
  productsManager = new ProductsManager();

  constructor() {
    this.path = __dirname + "/dao/managers/FileSystem/data/carts.json";

  }

  async getAllCarts() {
    const cartsJson = await fs.promises.readFile(this.path, 'utf-8');

    if (!cartsJson.trim()) {
      return [];
    }
    const cartsParse = JSON.parse(cartsJson);

    return cartsParse;
  }

  async getCartById(id) {
    const carts = await this.getAllCarts();
    const cart = carts.find((cart) => cart.id === id);

    if (!cart) return 'No se encontró ningún cart';

    return cart;
  }

  async createCart() {
    const carts = await this.getAllCarts();
    
    const newCart = {
      id: Date.now(),
      products: [],
    };
    carts.push(newCart);

    await fs.promises.writeFile(this.path, JSON.stringify(carts));

    return carts;
  }

  async addProductToCart(idCart, idProduct) {
   // Agregamos un producto en un carrito especifico
   
    // Llamamos todos los carritos
    const carts = await this.getAllCarts();
    
    // Traemos el producto enviado por id
    const product = await this.productsManager.getProductById(idProduct);

    // Si el id enviado no coincide con algún id  de los productos retornamos un mensaje y termina aquí el método
    if (!product) return `No se encontró el producto buscado con el id ${id}`;
    
    // Buscamos la posición indice del cart en el array de carts
    const cartIndex = carts.findIndex(cart => cart.id === idCart);

    // Si el id enviado no coincide con algún id  de los carts devuelve un -1 y respondemos un mensaje
    if (cartIndex === -1) return `No se encontró el cart buscado con el id ${id}`;
    
    // Si el cart se encuentra hacemos un push del product en su array de products 
    carts[cartIndex].products.push(product)

    // Guardamos el array de carts actualizado en carts.json
    await fs.promises.writeFile(this.path, JSON.stringify(carts));

    return carts;
  }

  async deleteCart(id) {
    const carts = await this.getAllCarts();

    const cartsFilters = carts.filter((cart) => cart.id !== id);

    await fs.promises.writeFile(this.path, JSON.stringify(carts));

    return cartsFilters;
  }
}

export default CartManager;
