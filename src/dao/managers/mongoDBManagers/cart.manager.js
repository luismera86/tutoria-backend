// Importamos nuestros modelo de Cart para trabajar sobre el con los métodos de mongoose
import Cart from "../../models/cart.model.js";
import Product from "../../models/product.model.js";
import { productManagerDB } from "./product.manager.js";

class CartManagerDB {
  // Llamamos todos los Carts
  async getAllCarts() {
    const carts = await Cart.find();
    return carts;
  }

  // Llamamos un Cart por su id
  async getCartById(id) {
    const cart = await Cart.findOne({ _id: id });
    if (!cart) return `No se encuentra el Cart con el id ${id}`;
    return cart;
  }

  // Agregamos un Cart a nuestra base de datos
  async addCart() {
    const newCart = {
      products: [],
    };
    const cart = await Cart.create(newCart);
    return cart;
  }

  // Agregamos un product al array products de Cart
  async addProductToCart(idCart, idProduct) {
    const cart = await this.getCartById(idCart);
    const product = await productManagerDB.getProductById(idProduct);

    const cartUpdate = await Cart.findOneAndUpdate(
      { _id: cart._id, 'products.product': product._id },
      { $inc: { 'products.$.quantity': 1 } },
      { new: true }
    );
  
    if (!cartUpdate) {
      const newCart = await Cart.findByIdAndUpdate(
        idCart,
        { $push: { products: { product: product._id, quantity: 1 } } },
        { new: true }
      );
      return newCart;
    }
  
    return cartUpdate;
  }

  // Eliminamos un Cart
  async deleteCart(id) {
    const cartDelete = await Cart.deleteOne({ _id: id });

    return cartDelete;
  }

  // Eliminar un producto de un Cart
  async deleteProductFromCart(idCart, idProduct) {

    const cart = await this.getCartById(idCart);
    
    const product = await productManagerDB.getProductById(idProduct);

    const cartUpdate = await cart.updateOne({ $pull: { products: { _id: product._id } } });

    return cartUpdate;

  }

  // Actualizamos un Cart
  async updateCart(idCart, cartData) {

    const cart = await this.getCartById(idCart);

    const cartUpdate = await cart.updateOne(cartData);

    return cartUpdate;

  }

  // Actualizamos la cantidad del producto en el Cart
  async updateProductQuantity(idCart, idProduct, quantity) {
      
      const cart = await this.getCartById(idCart);
  
      const product = await productManagerDB.getProductById(idProduct);
      const cartUpdate = await cart.findOneAndUpdate(
        { _id: cart._id, 'products.product': product._id },
        { $inc: { 'products.$.quantity': -1 } },
        { new: true }
      );
    
      if (cartUpdate) {
        const product = cartUpdate.products.find(prod => prod.product == idProduct);
    
        if (product.quantity === 0) {
          await Cart.findOneAndUpdate(
            { _id: idCart },
            { $pull: { products: { product: idProduct } } }
          );
        }
    
        return cartUpdate;
      }
  }
}

export const cartManagerDB = new CartManagerDB();
