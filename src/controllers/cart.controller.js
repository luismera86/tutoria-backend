import * as cartServices from "../services/cart.services";

const getAllCarts = async (req, res) => {
  try {
    const carts = await cartServices.getAllCarts();
    res.status(200).json(carts);
  } catch (error) {
    console.log(error);
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
    console.log(error);
  }
};

const addCart = async (req, res) => {
  try {
    const carts = await cartServices.addCart();
    res.status(200).json(carts);
  } catch (error) {
    console.log(error);
  }
};

const addProductToCart = async (req, res) => {
  const { cid, pid } = req.params;
  try {
    // Buscamos si existe el carrito y el producto en la base de datos
    const cart = await cartServices.getCartById(cid);
    if (!cart) return res.status(404).json({ msg: "Carrito no encontrado" });

    //! Corregir cuando se creen los servicios de products
    const product = await productManagerDB.getProductById(pid);
    if (!product) return res.status(404).json({ msg: "Producto no encontrado" });

    await cartServices.addProductToCart(cid, pid);

    res.status(200).json({ msg: "Producto agregado al carrito" });
  } catch (error) {
    console.log(error);
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
    console.log(error);
  }
};

const deleteProductFromCart = async (req, res) => {
  const { cid, pid } = req.params;
  try {
    // Buscamos si existe el carrito y el producto en la base de datos
    const cart = await cartServices.getCartById(cid);
    if (!cart) return res.status(404).json({ msg: "Carrito no encontrado" });

    //! const product = await productManagerDB.getProductById(pid);
    if (!product) return res.status(404).json({ msg: "Producto no encontrado" });

    // Buscamos si existe el producto en el carrito
    const productInCart = cart.products.find((product) => product.product == pid);
    if (!productInCart) return res.status(404).json({ msg: "Producto no encontrado en el carrito" });

    await cartServices.removeProductFromCart(cid, pid);

    res.status(200).json({ msg: "Producto eliminado del carrito" });
  } catch (error) {
    console.log(error);
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
    console.log(error);
  }
};

const updateProductsFromCart = async (req, res) => {
  const { cid } = req.params;
  const { products } = req.body;

  try {
    await cartServices.updateCart(cid, products);
    res.status(200).json({ msg: "Carrito actualizado" });
  } catch (error) {
    console.log(error);
  }
};

const updateProductQuantityFromCart = async (req, res) => {
  const { cid, pid } = req.params;
  const { quantity } = req.body;
  try {
    // Buscamos si existe el carrito y el producto en la base de datos
    const cart = await cartServices.getCartById(cid);
    if (!cart) return res.status(404).json({ msg: "Carrito no encontrado" });

    //!const product = await productManagerDB.getProductById(pid);
    if (!product) return res.status(404).json({ msg: "Producto no encontrado" });

    // Buscamos si existe el producto en el carrito
    const productInCart = cart.products.find((product) => product.product == pid);
    if (!productInCart) return res.status(404).json({ msg: "Producto no encontrado en el carrito" });

    await cartServices.updateProductQuantity(cid, pid, parseInt(quantity));

    res.status(200).json({ msg: `Cantidad de productos actualizada a ${quantity}` });
  } catch (error) {
    console.log(error);
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
};
