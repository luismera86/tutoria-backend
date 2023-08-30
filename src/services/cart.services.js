import { cartModel } from "../dao/models/cart.model.js";

// Llamamos todos los Carts
const getAllCarts = async () => {
  const carts = await cartModel.find();
  return carts;
};

// Llamamos un Cart por su id
const getCartById = async (cid) => {
  const cart = await cartModel.findOne({ _id: cid }).populate("products.product");
  return cart;
};

// Agregamos un Cart a nuestra base de datos
const addCart = async () => {
  const newCart = {
    products: [],
  };
  const cart = await cartModel.create(newCart);
  return cart;
};

// Agregamos un product al array products de Cart
const addProductToCart = async (cid, pid) => {
  const cartUpdate = await cartModel.findOneAndUpdate(
    { _id: cid, "products.product": pid },
    { $inc: { "products.$.quantity": 1 } },
    { new: true }
  );

  if (!cartUpdate) {
    const newCart = await cartModel.findByIdAndUpdate(
      cid,
      { $push: { products: { product: pid, quantity: 1 } } },
      { new: true }
    );
    return newCart;
  }

  return cartUpdate;
};

// Eliminamos un Cart
const deleteCart = async (cid) => {
  const cartDelete = await cartModel.deleteOne({ _id: cid });

  return cartDelete;
};

// Eliminamos todos los productos de un Cart
const removeAllProductsFromCart = async (cid) => {
  const cart = await this.getCartById(cid);

  const cartUpdate = await cart.updateOne({ $set: { products: [] } });

  return cartUpdate;
};

// Actualizamos el array products de Cart
const updateCart = async (cid, arrayProducts) => {
  await this.removeAllProductsFromCart(cid);

  arrayProducts.forEach(async (product) => {
    await this.addProductToCart(cid, product._id);
  });

  return await this.getCartById(cid);
};

// Actualizamos la cantidad del producto en el Cart
const updateProductQuantity = async (cid, pid, quantity) => {
  const cartUpdate = await cartModel.findOneAndUpdate(
    { _id: cid, "products.product": pid },
    { $set: { "products.$.quantity": quantity } },
    { new: true }
  );

  return cartUpdate;
};

// Quitamos un producto del Cart si llega a 0 lo quitamos del cart
const removeProductFromCart = async (cid, pid) => {
  const cart = await this.getCartById(cid);

  const product = await productManagerDB.getProductById(pid);

  const cartUpdate = await cartModel.findOneAndUpdate(
    { _id: cartModel._id, "products.product": product._id },
    { $inc: { "products.$.quantity": -1 } },
    { new: true }
  );

  // Si la cantidad del producto es 0 lo quitamos del cart
  if (cartUpdate) {
    const product = cartUpdate.products.find((prod) => prod.product == pid);

    if (product.quantity === 0) {
      await cartModel.findOneAndUpdate({ _id: cid }, { $pull: { products: { product: pid } } });
    }

    return cartUpdate;
  }
};

export {
  getAllCarts,
  getCartById,
  addCart,
  addProductToCart,
  deleteCart,
  removeAllProductsFromCart,
  updateCart,
  updateProductQuantity,
  removeProductFromCart,
};
