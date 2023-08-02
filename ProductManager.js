/* 

El productManager es muy importante en su proyecto ya que en el se realiza la lógica 
de la manipulación de la información que se transmiten entre cliente-servidor.
En esta etapa es donde nosotros realizamos el CRUD (Create, Read, Update, Delete)
Manejamos la conexión con el método de persistencia de datos, en este caso usamos File System que nos permite
manejar información con texto plano

*/

const fs = require('fs');

const path = require("path");

class ProductManager {
  constructor() {
    this.products = [];
     // Implementamos un path general para toda la clase, es de buenas prácticas realizarlo así, en caso de cambiar
    // la ruta se cambia directamente en todos los lugares que se instancia la clase
    this.path = path.join(__dirname, "./data/products.json");
  }

  async addProduct(product) {
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
    await fs.promises.writeFile(this.path, JSON.stringify(products));

  }

  async getProducts() {
    // leemos todos los productos del archivo json
    const productsJson = await fs.promises.readFile(this.path, 'utf-8');

    // Verificamos si el archivo json no está vació, en caso que este vacío retorna un array []
    if (!productsJson.trim()) return [];
    

    // Una ves recibida la información del archivo json, está viene en formato texto plano,
    // para que javascript pueda interpretarla como un array con productos tenemos que parsear la información
    const productsParse = JSON.parse(productsJson);

    // retornamos los productos parseados
    return productsParse;
  }

  async getProductById(id) {
     // Primero llamamos todos los productos
     const products = await this.getAllProducts();

     // Luego buscamos entre los productos el producto que coincida con el id recibido
     const product = products.find((product) => product.id === id);
 
     // Si el id enviado no coincide con algún id  de los productos retornamos un mensaje y termina aquí el método
     if (!product) return `No se encontró el producto buscado con el id ${id}`;
 
     // En caso de que el producto exista retornamos el producto encontrado
     return product;
  }

  async updateProductById(id, product) {
    // Primero llamamos todos los productos
    const products = await this.getAllProducts();

    // Luego buscamos entre los productos el producto que coincida con el id recibido
    const productIndex = products.findIndex((product) => product.id === id);

    // Si el id enviado no coincide con algún id  de los productos retornamos un mensaje y termina aquí el método
    if (productIndex === -1) return `No se encontró el producto buscado con el id ${id}`;

    // En caso de que el producto exista, actualizamos el producto
    products[productIndex] = { ...product, id };

    // Guardamos en el archivo products.json la información actualizada
    await fs.promises.writeFile(this.path, JSON.stringify(products));

    // Retornamos el array actualizado
    return products;
  }

  async deleteProductById(id) {
    // Llamamos a todos los productos guardados en el archivo json
    const products = await this.getAllProducts();

    // Luego buscamos entre los productos el producto que coincida con el id recibido
    const product = products.find((product) => product.id === id);

    // Si el id enviado no coincide con algún id  de los productos retornamos un mensaje y termina aquí el método
    if (!product) return `No se encontró el producto buscado con el id ${id}`;

    // Filtramos los productos que no coincidan con el id del producto a eliminar
    const productsFilter = products.filter((product) => product.id !== id);

    // Guardamos en el archivo products.json el nuevo array sin el producto que eliminamos
    await fs.promises.writeFile(this.path, JSON.stringify(productsFilter));

    // Retornamos el array actualizado
    return productsFilter;
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

product1.updateProductById(1, {
  title: "Producto 1",
  description: "Descripción del producto 1",
  price: 100,
  thumbnail: "https://cdn3.iconfinder.com/data/icons/education-209/64/bus-vehicle-transport-school-128.png",
  code: "ABC123",
  stock: 10,
});

product1.deleteProductById(1);

