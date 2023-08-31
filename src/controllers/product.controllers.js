import * as productServices from "../services/product.services.js";

const getAllProducts = async (req, res) => {
  const { limit, page, sort, category, status } = req.query;

  try {
    const options = {
      limit: limit || 10,
      page: page || 1,
      sort: {
        price: sort === "asc" ? 1 : -1,
      },
      lean: true,
    };
    // TODO Llevar está lógica a los services y utilizar un operador ternario para definir el query de status o category
    if (status != undefined) {
      const resProducts = await productServices.getAllProducts({ status: status }, options);
      return res.json({ resProducts });
    }

    if (category != undefined) {
      const resProducts = await productServices.getAllProducts({ category: category }, options);
      return res.json({ resProducts });
    }

    const resProducts = await productServices.getAllProducts({}, options);
    console.log(resProducts);
    const { totalPages, docs, hasPrevPage, hasNextPage, prevPage, nextPage } = resProducts;
    res.status(200).json({
      status: "success",
      products: docs,
      totalPages,
      prevPage,
      nextPage,
      page: resProducts.page,
      hasPrevPage,
      hasNextPage,
      prevLink: `http://localhost:8080/products?page=${prevPage}`,
      nextLink: `http://localhost:8080/products?page=${nextPage}`,
    });
  } catch (error) {
    console.log(error);
  }
};

const getProductById = async (req, res) => {
  const { id } = req.params;
  try {
    const resProduct = await productServices.getProductById(id);

    res.status(200).json(resProduct);
  } catch (error) {
    console.log(error);
  }
};

const addProduct = async (req, res) => {
  const body = req.body;
  try {
    const resProducts = await productServices.addProduct(body);

    res.status(200).json(resProducts);
  } catch (error) {
    console.log(error);
  }
};

const updateProduct = async (req, res) => {
  const { id } = req.params;
  const body = req.body;

  try {
    await productServices.updateProduct(id, body);
    const product = await productServices.getProductById(id);

    res.status(200).json({
      msg: "Producto actualizado",
      product,
    });
  } catch (error) {
    console.log(error);
  }
};

const deleteProduct = async (req, res) => {
  const { id } = req.params;
  try {
    await productServices.deleteProduct(id);
    res.status(200).json({ msg: "Producto eliminado" });
  } catch (error) {
    console.log(error);
  }
};

export { addProduct, updateProduct, deleteProduct, getAllProducts, getProductById };
