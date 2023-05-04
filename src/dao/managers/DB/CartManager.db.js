// Importamos nuestros modelo de Cart para trabajar sobre el con los métodos de mongoose
import Cart from "../../models/cart.model";
import Product from "../../models/product.model";

export class CartManager {

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
  async addCart(Cart) {
    const { title, price, description, thumbnail, status, stock, code, category } = Cart;

    const checkCartInfo = Object.values(Cart).includes(undefined);

    if (checkCartInfo) return 'Faltan propiedades al Cart';

    const cart = await Cart.create(Cart);
    return cart;
  }

  // Agregamos un product al array products de Cart
  async addProductToCart(idCart, idProduct) {
    const product = await Product.findOne({ _id: idProduct })
    if(!product) return `El producto con el id ${idProduct} no existe`
    const cartUpdate = await Cart.updateOne({ _id: idCart }, {$push: {products: product}});
    return cartUpdate;
  }

  // Eliminamos un Cart
  async deleteCart(id) {
    const cartDelete = await Cart.deleteOne({ _id: id });

    return cartDelete;
  }
}