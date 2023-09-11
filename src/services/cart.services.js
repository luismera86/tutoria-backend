import * as cartDao from "../dao/mongo/cart.dao.js";

// Llamamos todos los Carts
const getAllCarts = async () => {
  const carts = await cartDao.getAllCarts();
  return carts;
};

// Llamamos un Cart por su id
const getCartById = async (cid) => {
  const cart = await cartDao.getCartById(cid);
  return cart;
};

// Agregamos un Cart a nuestra base de datos
const addCart = async () => {
  const cart = await cartDao.addCart();
  return cart;
};

// Agregamos un product al array products de Cart
const addProductToCart = async (cid, pid) => {
  const cartUpdate = await cartDao.addProductToCart(cid, pid);

  return cartUpdate;
};

// Eliminamos un Cart
const deleteCart = async (cid) => {
  const cartDelete = await cartDao.deleteCart(cid);

  return cartDelete;
};

// Eliminamos todos los productos de un Cart
const removeAllProductsFromCart = async (cid) => {
  const cartUpdate = await cartDao.removeAllProductsFromCart(cid);

  return cartUpdate;
};

// Actualizamos el array products de Cart
const updateCart = async (cid, arrayProducts) => {
  const cartUpdate = await cartDao.updateCart(cid, arrayProducts);

  return cartUpdate;
};

// Actualizamos la cantidad del producto en el Cart
const updateProductQuantity = async (cid, pid, quantity) => {
  const cartUpdate = await cartDao.updateProductQuantity(cid, pid, quantity);

  return cartUpdate;
};

// Quitamos un producto del Cart si llega a 0 lo quitamos del cart
const removeProductFromCart = async (cid, pid) => {
  const cartUpdate = await cartDao.removeProductFromCart(cid, pid);

  return cartUpdate;
};

const purchaseCart = async (cid, user) => {
  const cart = await cartDao.purchaseCart(cid, user);
  return cart;
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
  purchaseCart,
};
