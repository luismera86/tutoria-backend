// Importamos nuestros modelo de Cart para trabajar sobre el con los métodos de mongoose
import CartModel from '../../models/cart.model.js';
import ProductModel from '../../models/product.model.js';

export class CartManagerDB {
  // Llamamos todos los Carts
  async getAllCarts() {
    const carts = await CartModel.find();
    return carts;
  }

  // Llamamos un Cart por su id
  async getCartById(id) {
    const cart = await CartModel.findOne({ _id: id });
    if (!cart) return `No se encuentra el Cart con el id ${id}`;
    return cart;
  }

  // Agregamos un Cart a nuestra base de datos
  async addCart() {
    const newCart = {
      products: [],
    };
    const cart = await CartModel.create(newCart);
    return cart;
  }

  // Agregamos un product al array products de Cart
  async addProductToCart(cid, pid) {
    const product = await ProductModel.findOne({ _id: pid });
    if (!product) return `El producto con el id ${pid} no existe`;

    const cart = await CartModel.findOne({ _id: cid });
    if (!cart) return `El carrito con el id ${cid} no existe`;

    // Verificar si el producto ya está en el carrito
    const checkProduct = cart.products.find((p) => p.product == pid);

    // Si el producto existe sumamos la cantidad en 1
    if (checkProduct) {
      checkProduct.quantity = checkProduct.quantity + 1;
      await cart.save();
      return cart;
    }

    // Si el producto no existe lo insertamos en el array de productos
    cart.products.push({
      product: pid,
      quantity: 1,
    });

    await cart.save();

    return cart;
  }

  // Eliminamos un Cart
  async deleteCart(id) {
    const cartDelete = await CartModel.deleteOne({ _id: id });

    return cartDelete;
  }

  // Eliminar un producto del cart
  async deleteProductToCart(cid, pid) {
    const product = await ProductModel.findOne({ _id: pid });
    if (!product) return `El producto con el id ${pid} no existe`;

    const cart = await CartModel.findOne({ _id: cid });
    if (!cart) return `El carrito con el id ${cid} no existe`;

    const checkProduct = cart.products.find((p) => p.product == pid);

    // Descontamos la cantidad del producto en 1
    checkProduct.quantity = checkProduct.quantity - 1;

    // Si la cantidad llega a 0 entonces eliminamos el objeto del carrito
    if (checkProduct.quantity === 0) {
      // Verificar el indice donde está el producto
      const pIndex = cart.products.findIndex((p) => p.product == pid);

      // Eliminamos el elemento del array products
      cart.products.splice(pIndex, 1);

      await cart.save();
      return cart;
    }

    await cart.save();

    return cart;
  }

  // Eliminamos todos los productos del carrito
  async deleteAllProductsToCart(cid) {
    const cart = await CartModel.findOne({ _id: cid });
    if (!cart) return `El carrito con el id ${cid} no existe`;

    cart.products = [];
    await cart.save();

    return cart;
  }

  // Actualizamos los productos del carrito
  async updateCart(cid, products) {
    const cart = await CartModel.findOne({ _id: cid });
    if (!cart) return `El carrito con el id ${cid} no existe`;

    cart.set({ products });

    await cart.save();

    return cart;
  }

  // Actualizamos al cantidad de productos del carrito
  async updateProductToCart(cid, pid, quantity) {
    const cart = await CartModel.findOne({ _id: cid });
    if (!cart) return `El carrito con el id ${cid} no existe`;

    const product = await ProductModel.findOne({ _id: pid });
    if (!product) return `El producto con el id ${pid} no existe`;

    const checkProduct = cart.products.find((p) => p.product == pid);

    // Modificamos la cantidad enviada por el usuario
    checkProduct.quantity = quantity;

    await cart.save();

    return cart;
  }
}
