import * as cartServices from "../services/cart.services.js";
import * as productServices from "../services/product.services.js";
import { logger } from "../utils/logger.js";

const getAllCarts = async (req, res) => {
  try {
    const carts = await cartServices.getAllCarts();
    res.status(200).json(carts);
  } catch (error) {
    logger.error(error.message);
    res.status(500).json({ error: "Server internal error" });
  }
};

const getCartById = async (req, res) => {
  const { cid } = req.params;
  try {
    // Buscamos si existe el carrito y el producto en la base de datos
    const cart = await cartServices.getCartById(cid);
    if (!cart) return res.status(404).json({ msg: "Carrito no encontrado" });

    res.status(200).json(cart);
  } catch (error) {
    logger.error(error.message);
    res.status(500).json({ error: "Server internal error" });
  }
};

const addCart = async (req, res) => {
  try {
    const carts = await cartServices.addCart();
    res.status(200).json(carts);
  } catch (error) {
    logger.error(error.message);
    res.status(500).json({ error: "Server internal error" });
  }
};

const addProductToCart = async (req, res) => {
  const { cid, pid } = req.params;
  try {
    // Buscamos si existe el carrito y el producto en la base de datos
    const cart = await cartServices.getCartById(cid);
    if (!cart) return res.status(404).json({ msg: "Carrito no encontrado" });

    const product = await productServices.getProductById(pid);
    if (!product) return res.status(404).json({ msg: "Producto no encontrado" });

    const user = req.session.user;
    if(user.email === product.owner) return res.status(403).json({ msg: "No puede agregar un producto propio al carrito" });

    const response = await cartServices.addProductToCart(cid, pid);

    res.status(200).json({ msg: "Producto agregado al carrito", products: response.products });
  } catch (error) {
    logger.error(error.message);
    res.status(500).json({ error: "Server internal error" });
  }
};

const addProductInUserCart = async (req, res) => {
  const { pid } = req.params;
  const { user } = req.session;
  try {
    const product = await productServices.getProductById(pid);
    if (!product) return res.status(404).json({ msg: "Producto no encontrado" });

    const response = await cartServices.addProductToCart(user.cart, pid);

    res.status(200).json({ msg: "Producto agregado al carrito", products: response.products });
  } catch (error) {
    logger.error(error.message);
    res.status(500).json({ error: "Server internal error" });
  }
};

const deleteCart = async (req, res) => {
  const { cid } = req.params;
  try {
    // Buscamos si existe el carrito
    const cart = await cartServices.getCartById(cid);
    if (!cart) return res.status(404).json({ msg: "Carrito no encontrado" });

    await cartServices.deleteCart(cid);

    res.status(200).json({ msg: "Carrito eliminado" });
  } catch (error) {
    logger.error(error.message);
    res.status(500).json({ error: "Server internal error" });
  }
};

const deleteProductFromCart = async (req, res) => {
  const { cid, pid } = req.params;
  try {
    // Buscamos si existe el carrito y el producto en la base de datos
    const cart = await cartServices.getCartById(cid);
    if (!cart) return res.status(404).json({ msg: "Carrito no encontrado" });

    const product = await productServices.getProductById(pid);
    if (!product) return res.status(404).json({ msg: "Producto no encontrado" });

    // Buscamos si existe el producto en el carrito
    const productInCart = cart.products.find((product) => product.product == pid);
    if (!productInCart) return res.status(404).json({ msg: "Producto no encontrado en el carrito" });

    await cartServices.removeProductFromCart(cid, pid);

    res.status(200).json({ msg: "Producto eliminado del carrito" });
  } catch (error) {
    logger.error(error.message);
    res.status(500).json({ error: "Server internal error" });
  }
};

const deleteAllProductsFromCart = async (req, res) => {
  const { cid } = req.params;
  try {
    // Buscamos si existe el carrito y el producto en la base de datos
    const cart = await cartServices.getCartById(cid);
    if (!cart) return res.status(404).json({ msg: "Carrito no encontrado" });

    await cartServices.removeAllProductsFromCart(cid);

    res.status(200).json({ msg: "Productos eliminados del carrito" });
  } catch (error) {
    logger.error(error.message);
    res.status(500).json({ error: "Server internal error" });
  }
};

const updateProductsFromCart = async (req, res) => {
  const { cid } = req.params;
  const { products } = req.body;

  try {
    const response = await cartServices.updateCart(cid, products);
    res.status(200).json({ msg: "Carrito actualizado", response });
  } catch (error) {
    logger.error(error.message);
    res.status(500).json({ error: "Server internal error" });
  }
};

const updateProductQuantityFromCart = async (req, res) => {
  const { cid, pid } = req.params;
  const { quantity } = req.body;
  try {
    // Buscamos si existe el carrito y el producto en la base de datos
    const cart = await cartServices.getCartById(cid);
    if (!cart) return res.status(404).json({ msg: "Carrito no encontrado" });

    const product = await productServices.getProductById(pid);
    if (!product) return res.status(404).json({ msg: "Producto no encontrado" });

    // Buscamos si existe el producto en el carrito
    const productInCart = cart.products.find((product) => product.product == pid);
    if (!productInCart) return res.status(404).json({ msg: "Producto no encontrado en el carrito" });

    await cartServices.updateProductQuantity(cid, pid, parseInt(quantity));

    res.status(200).json({ msg: `Cantidad de productos actualizada a ${quantity}` });
  } catch (error) {
    logger.error(error.message);
    res.status(500).json({ error: "Server internal error" });
  }
};

const purchaseCart = async (req, res) => {
  const { cid } = req.params;
  const user = req.session.user;
  try {
    // Buscamos si existe el carrito y el producto en la base de datos
    const cart = await cartServices.getCartById(cid);
    if (!cart) return res.status(404).json({ msg: "Carrito no encontrado" });

    const response = await cartServices.purchaseCart(cid, user);

    res.status(200).json({ msg: "Compra realizada", response });
  } catch (error) {
    logger.error(error.message);
    res.status(500).json({ error: "Server internal error" });
  }
};

export {
  getAllCarts,
  getCartById,
  addCart,
  addProductToCart,
  deleteCart,
  deleteProductFromCart,
  deleteAllProductsFromCart,
  updateProductsFromCart,
  updateProductQuantityFromCart,
  addProductInUserCart,
  purchaseCart,
};
