/* 


El productManager es muy importante en su proyecto ya que en el se realiza la lógica 
de la manipulación de la información que se transmiten entre cliente-servidor.
En esta etapa es donde nosotros realizamos el CRUD (Create, Read, Update, Delete)
Manejamos la conexión con el método de persistencia de datos, en este caso usamos File System que nos permite
manejar información con texto plano

*/

import fs from'fs';
import path from "path";
import { __dirname } from '../../../utils.js';

// path es una herramienta que viene integrada con node sirve para declarar rutas relativas a la raíz del proyecto 

class ProductsManager {
  // En el constructor se coloca la información o datos o métodos que se quieren inicializar en cualquier instancia de clase
  constructor() {
    // Implementamos un path general para toda la clase, es de buenas prácticas realizarlo así, en caso de cambiar
    // la ruta se cambia directamente en todos los lugares que se instancia la clase
    this.path = __dirname + "/dao/managers/FileSystem/data/products.json";
  }

  // Un método de una clase equivale a una función tradicional, solo que se puede ejecutar solo cuando se instancia la clase
  async getAllProducts() {
    
    // leemos todos los productos del archivo json
    const productsJson = await fs.promises.readFile(this.path, 'utf-8');

    // Verificamos si el archivo json no está vació, en caso que este vacío retorna un array []
    if (!productsJson.trim()) {
      return [];
    }

    // Una ves recibida la información del archivo json, está viene en formato texto plano,
    // para que javascript pueda interpretarla como un array con productos tenemos que parsear la información
    const productsParse = JSON.parse(productsJson);

    // retornamos los productos parseados
    return productsParse;
  }

  async getProductById(id) {
    // Leemos un producto con el id especifico

    // Primero llamamos todos los productos
    const products = await this.getAllProducts();

    // Luego buscamos entre los productos el producto que coincida con el id recibido
    const product = products.find((product) => product.id === id);

    // Si el id enviado no coincide con algún id  de los productos retornamos un mensaje y termina aquí el método
    if (!product) return `No se encontró el producto buscado con el id ${id}`;

    // En caso de que el producto exista retornamos el producto encontrado
    return product;
  }

  async addProduct(product) {
    // Agregamos un producto a nuestro archivo de persistencia

    /* 
    Primero desestructuramos el product que nos llega por parámetro, está forma es mejor que 
    recibir muchos parámetros, por que: 
    1) Es buena práctica tratar de nos superar los 3 parámetros recibidos
    2) Al llegar la información no necesariamente tiene que respetar el orden de los parámetros,
      si viene el title o el price en diferente orden es indiferente ya que lo que importa es que la
      información llegue.
    */
    const { title, price, description, thumbnail, status, stock, code, category } = product;

    // Llamamos a todos los productos guardados en el archivo json
    const products = await this.getAllProducts();

    /* 
    Creamos una variable donde almacenamos los datos de los productos recibidos y generamos un id
    auto incrementable de acuerdo a la longitud del array de productos 
    */
    const newProduct = {
      id: Date.now(), // Es un método rústico que uso para generar id únicos, el products.length + 1  el problema que tiene es que al eliminar un producto se repiten los id al agregar uno nuevo. 
      title,
      price,
      description,
      thumbnail,
      status,
      stock,
      code,
      category,
    };

    /* 
    Chequeamos que el newProduct tenga todas las propiedades.
    Con Object.values verificamos todos los valores de las propiedades,
    si alguna se encuentra en undefined retornará un true 
    */
    const checkProductInfo = Object.values(newProduct).includes(undefined);

    // verificamos si el resultado del chequeo es true, esto quiere decir que algún valor del objeto
    // newProduct es undefined y retornamos un mensaje
    if (checkProductInfo) return 'Faltan propiedades al producto';

    // En caso de que todos las propiedades esten bien pusheamos en el array de productos el producto nuevo
    products.push(newProduct);

    // Guardamos el listado de productos con el newProduct en el archivo products.json reemplazando la información anterior
    // el JSON.stringify() sirve para pasar a texto plano y se pueda guardar la información en un archivo json o txt. 
    await fs.promises.writeFile(this.path, JSON.stringify(products));

    // Retornamos los productos con el nuevo producto agregado
    return products;
  }

  async updateProduct(id, data) {
    // Actualizamos la información de un producto

    // Llamamos a todos los productos guardados en el archivo json
    const products = await this.getAllProducts();

    /* 
    Luego buscamos entre los productos el producto que coincida con el id recibido,
    el método findIndex busca el número de indice de posición en el array
    sino encuentra nada devuelve un -1
    */
    const productIndex = products.findIndex((product) => product.id === id);

    // Si el id enviado no coincide con algún id  de los productos devuelve un -1 y respondemos un mensaje
    if (productIndex === -1) return `No se encontró el producto buscado con el id ${id}`;

    // Modificamos la información del producto en la posición encontrada
    products[productIndex] = {
      // Con el operador spread hacemos una copia del producto original
      ...products[productIndex],
      // Reemplazamos las propiedades existentes con las que  vienen en data (puede venir solo una propiedad o las que sean necesarias cambiar)
      ...data,
    };

    /* 
    Chequeamos que el newProduct tenga todas las propiedades.
    Con Object.values verificamos todos los valores de las propiedades,
    si alguna se encuentra en undefined retornará un true 
    */
    const checkProductInfo = Object.values(products[productIndex]).includes(undefined);

    // verificamos si el resultado del chequeo es true, esto quiere decir que algún valor del objeto
    if (checkProductInfo) return 'Faltan propiedades al producto';

    // Guardamos en el archivo products.json la información actualizada
    await fs.promises.writeFile(this.path, JSON.stringify(products));

    // Retornamos el array actualizado
    return products;
  }

  async deleteProduct(id) {
    // eliminamos un producto

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

export default ProductsManager;
