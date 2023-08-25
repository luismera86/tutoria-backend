// Importamos nuestros modelo de Cart para trabajar sobre el con los métodos de mongoose
import { cartModel } from "../../models/cart.model.js";
import { productManagerDB } from "./product.manager.js";

class CartManagerDB {
  // Llamamos todos los Carts
  async getAllCarts() {
    const carts = await cartModel.find();
    return carts;
  }

  // Llamamos un Cart por su id
  async getCartById(id) {
    const cart = await cartModel.findOne({ _id: id }).populate("products.product");
    return cart;
  }

  // Agregamos un Cart a nuestra base de datos
  async addCart() {
    const newCart = {
      products: [],
    };
    const cart = await cartModel.create(newCart);
    return cart;
  }

  // Agregamos un product al array products de Cart
  async addProductToCart(idCart, idProduct) {
    const cartUpdate = await cartModel.findOneAndUpdate(
      { _id: idCart, "products.product": idProduct },
      { $inc: { "products.$.quantity": 1 } },
      { new: true }
    );

    if (!cartUpdate) {
      const newCart = await cartModel.findByIdAndUpdate(
        idCart,
        { $push: { products: { product: idProduct, quantity: 1 } } },
        { new: true }
      );
      return newCart;
    }

    return cartUpdate;
  }

  // Eliminamos un Cart
  async deleteCart(id) {
    const cartDelete = await cartModel.deleteOne({ _id: id });

    return cartDelete;
  }

  // Eliminar un producto de un Cart
  async deleteProductFromCart(idCart, idProduct) {
    const cart = await this.getCartById(idCart);

    const cartUpdate = await cart.updateOne({ $pull: { products: { _id: idProduct } } });

    return cartUpdate;
  }

  // Eliminamos todos los productos de un Cart
  async removeAllProductsFromCart(idCart) {
    const cart = await this.getCartById(idCart);

    const cartUpdate = await cart.updateOne({ $set: { products: [] } });

    return cartUpdate;
  }

  // Actualizamos el array products de Cart
  async updateCart(idCart, arrayProducts) {
    await this.removeAllProductsFromCart(idCart);

    arrayProducts.forEach(async (product) => {
      await this.addProductToCart(idCart, product._id);
    });

    return await this.getCartById(idCart);
  }

  // Actualizamos la cantidad del producto en el Cart
  async updateProductQuantity(idCart, idProduct, quantity) {
    const cartUpdate = await cartModel.findOneAndUpdate(
      { _id: idCart, "products.product": idProduct },
      { $set: { "products.$.quantity": quantity } },
      { new: true }
    );

    return cartUpdate;
  }

  // Quitamos un producto del Cart si llega a 0 lo quitamos del cart
  async removeProductFromCart(idCart, idProduct) {
    const cart = await this.getCartById(idCart);

    const product = await productManagerDB.getProductById(idProduct);

    const cartUpdate = await cartModel.findOneAndUpdate(
      { _id: cartModel._id, "products.product": product._id },
      { $inc: { "products.$.quantity": -1 } },
      { new: true }
    );

    if (cartUpdate) {
      const product = cartUpdate.products.find((prod) => prod.product == idProduct);

      if (product.quantity === 0) {
        await cartModel.findOneAndUpdate({ _id: idCart }, { $pull: { products: { product: idProduct } } });
      }

      return cartUpdate;
    }
  }
}

export const cartManagerDB = new CartManagerDB();
