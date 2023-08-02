class ProductManager {
  constructor() {
    this.products = [];
  }

  addProduct(product) {
    const { title, description, price, thumbnail, code, stock } = product;
    const newProduct = {
      id: this.products.length + 1,
      title,
      description,
      price,
      thumbnail,
      code,
      stock,
    };
    // Validar que no se repita el campo code
    const productExists = this.products.find((p) => p.code === code);
    if (productExists) throw new Error("Ya existe un producto con ese código");

    this.products.push(newProduct);
  }

  getProducts() {
    console.log(this.products);
    return this.products;
  }

  getProductById(id) {
    const product = this.products.find((p) => p.id === id);
    if (!product) throw new Error("No existe un producto con ese id");
    console.log(product);
    return product;
  }
}

const product1 = new ProductManager();
product1.addProduct({
  title: "Producto 1",
  description: "Descripción del producto 1",
  price: 100,
  thumbnail: "https://cdn3.iconfinder.com/data/icons/education-209/64/bus-vehicle-transport-school-128.png",
  code: "ABC123",
  stock: 10,
});

product1.addProduct({
  title: "Producto 2",
  description: "Descripción del producto 2",
  price: 200,
  thumbnail: "https://cdn3.iconfinder.com/data/icons/education-209/64/bus-vehicle-transport-school-128.png",
  code: "ABC124",
  stock: 10,
});

product1.getProducts();

product1.getProductById(1);
