import { cartModel } from "../dao/models/cart.model.js";

const getAllCartsService = async () => {
  const carts = await cartModel.find();
  return carts;
};

const getCartByIdService = async (id) => {
  const cart = await cartModel.findOne({ _id: id }).populate("products.product");
  return cart;
};

const addCartService = async () => {
  const newCart = {
    products: [],
  };
  const cart = await cartModel.create(newCart);
  return cart;
};

const addProductToCartService = async (cid, pid) => {
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

const deleteCartService = async (cid) => {
  const cartDelete = await cartModel.deleteOne({ _id: cid });

  return cartDelete;
};

const deleteAllProductsFromCartService = async (cid) => {
  const cart = await getCartByIdService(cid);

  const cartUpdate = await cart.updateOne({ $set: { products: [] } });

  return cartUpdate;
};

const updateProductsFromCartService = async (cid, products) => {
  const cart = await getCartByIdService(cid);

  const cartUpdate = await cart.updateOne({ $set: { products: products } });

  return cartUpdate;
};

const updateProductQuantityFromCartService = async (cid, pid, quantity) => {
  const cart = await getCartByIdService(cid);

  const cartUpdate = await cart.updateOne(
    { _id: cid, "products.product": pid },
    { $set: { "products.$.quantity": quantity } }
  );

  return cartUpdate;
};

const removeProductFromCartService = async (cid, pid) => {
  const cart = await this.getCartById(cid);

  const product = await productManagerDB.getProductById(pid);

  const cartUpdate = await cartModel.findOneAndUpdate(
    { _id: cart._id, "products.product": product._id },
    { $inc: { "products.$.quantity": -1 } },
    { new: true }
  );

  if (cartUpdate) {
    const product = cartUpdate.products.find((prod) => prod.product == pid);

    if (product.quantity === 0) {
      await cartModel.findOneAndUpdate({ _id: cid }, { $pull: { products: { product: pid } } });
    }

    return cartUpdate;
  }
};

export {
  getAllCartsService,
  getCartByIdService,
  addCartService,
  addProductToCartService,
  deleteCartService,
  deleteAllProductsFromCartService,
  updateProductsFromCartService,
  updateProductQuantityFromCartService,
  removeProductFromCartService,
};
