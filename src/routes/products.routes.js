
// Importamos el Router de express para poder trabajar las peticiones get, post, put y delete

import ProductsManager from'../managers/productsManager.js';
import { Router } from 'express';

// Importamos el ProductManager para utilizar los métodos necesarios en los endpoint 


// Hacemos una instancia del ProductManager para poder llamar a sus métodos
const products = new ProductsManager();

/* 
Como buena práctica almacenos en una variable el nombre de la ruta path,
ya que puedo evitar errores de escritura en diferentes rutas, por ejemplo 
en una ruta pongo /products y en otra no me doy cuenta pongo /product sin la "s"
te ahorras dolores de cabeza a futuro ya que en todas las rutas llamas al path y 
todas van a tener el mismo valor
*/
const path = 'products';

// Almacenamos el Router importado de express y lo ejecutamos para poder llamar
// sus métodos get, post, put y delete
const router = Router();

/* 
Creamos el primer endpoint get
- En el archivo app.js se configura el path principal "/api"
- En este endpoint configuramos primero la ruta que va continuar de la principal,
  si configuramos nuestro path como "products" la ruta completa sería /api/products
- Luego se coloca un callback, que es una función async que recibe por parámetros un req y un res
  req: son los datos que recibe el servidor, que pueden ser por body, params o headers
  res: es la respuesta que realiza el servidor al cliente, que pueden ser un status, un json, etc.
- En el desarrollo de está función incorporamos un try y catch,
  try: es donde la función se desarrolla con normalidad si no ocurre ningún tipo de error
  catch: es el manejador de errores en donde se atrapa el error ocurrido y se puede dar una respuesta del servidor.
*/
router.get(`/${path}`, async (req, res) => {
  try {

    // Lamamos los productos con el ProductManager
    const resProducts = await products.getAllProducts();

    // El servidor responde un json con el listado de productos solicitados por el cliente
    res.status(200).json(resProducts);
  } catch (error) {
    console.log(error);
  }
});

/* 
  Cuando queremos recibir una información por parámetro 
  debemos agregarle a la ruta el alias del parámetros luego de los ":" /:alias 
  en este caso usamos el id como alias /:id 
*/
router.get(`/${path}/:id`, async (req, res) => {
  // Desestructuramos de los req.params el alias enviado por el cliente
  const { id } = req.params;
  try {
    /* 
      Buscamos el producto con el id enviados por el cliente con el método del ProductManager
      Es importante tener en cuneta que los params recibidos tienen el formato string
      si ustedes tienen el id de tipo number antes de enviarlos deben transformarlo 
      a tipo number con parseInt()
    */
    const resProduct = await products.getProductById(parseInt(id));

    // El servidor envía la respuesta del método getProductById en un json 
    res.status(200).json(resProduct);
  } catch (error) {
    // En caso de haber un error se atrapa en el catch y muestra el error por la consola
    console.log(error);
  }
});

/* 
  El método post
  El cliente nos envía por medio del body un objeto json con la información 
  que deseamos almacenar en nuestro archivo products.json 
*/
router.post(`/${path}`, async (req, res) => {
  // Almacenamos en la constante body los datos del req.body recibidos
  const body = req.body;
  try {
    // Enviamos los datos del body (el objeto con las propiedades del producto) al método addProduct
    // Ya en ese método verifica si tiene todos los productos o no y nos da la respuesta correspondiente
    const resProducts = await products.addProduct(body);

    // El servidor responde el resultado de addProduct
    res.status(200).json(resProducts);
  } catch (error) {
    console.log(error);
  }
});

/* 
  Método put
  En este endpoint recibimos dos cosas de parte del cliente, un param y un body
  param: recibimos el id del producto a actualizar la información
  body: recibimos los datos del producto que se van a actualizar
*/
router.put(`/${path}/:id`, async (req, res) => {
  // Seguimos los mismos pasos que en los endpoint anteriores
  const { id } = req.params;
  const body = req.body;
  try {

    // Enviamos los datos al método updateProduct y almacenamos su respuesta en resProducts
    const resProducts = await products.updateProduct(parseInt(id), body);
    
    // El servidor envía la respuesta del método updateProducts
    res.status(200).json(resProducts);
  } catch (error) {
    console.log(error);
  }
});

/* 
  Método delete
  En este endpoint recibimos el id del producto a eliminar por params
  y desarrolla la misma lógica que el método get por id 
*/
router.delete(`/${path}/:id`, async (req, res) => {
  const { id } = req.params;
  try {
    const resProduct = await products.deleteProduct(parseInt(id));
    res.status(200).json(resProduct);
  } catch (error) {
    console.log(error);
  }
});

// Exportamos el router para poder inicializar en el app.js
export default router;
