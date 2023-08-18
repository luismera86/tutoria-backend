// Importamos express
import express from "express";

// Importamos sockets io
import { Server } from "socket.io";

// Importamos handlebars
import handlebars from "express-handlebars";

import { mongoDBConnection } from "./config/mongoDB.config.js";
import { productManagerDB } from "./dao/managers/mongoDBManagers/product.manager.js";
import { routerCarts } from "./routes/carts.routes.js";
import { routerProducts } from "./routes/products.routes.js";
import { routerViews } from "./routes/views.router.js";

// Almacenamos el puerto en una constante
const PORT = 8080;

// Almacenamos express ejecutado en la constante app
const app = express();

// Implementamos handlebars
app.engine("handlebars", handlebars.engine());
app.set("views", "views");
app.set("view engine", "handlebars");

// conectamos mongoose con la base de datos local
mongoDBConnection();

// Asignamos la carpeta donde van a estar los contenidos públicos
app.use(express.static("public"));

// Usamos express.json() para que express pueda interpretar los archivos json y recibidos en el body y los parsea para poder trabajarlos con javascript
app.use(express.json());

// express.urlencoded es una función proporcionada por Express. Esta función se utiliza para analizar los datos que se envían desde un formulario HTML que se envía mediante el método HTTP POST.
app.use(express.urlencoded({ extended: true }));

// Iniciamos las rutas importadas, las de products y carts para poder utilizar los endpoints
app.use("/api/products", routerProducts);
app.use("/api/carts", routerCarts);
app.use("/", routerViews);

// Iniciamos el servidor en el puerto asignado en la constante PORT

const httpServer = app.listen(PORT, () => {
  console.log(`Servidor conectado en el puerto ${PORT}`);
});

const products = await productManagerDB.getAllProducts();

// Configuramos el servidor de socket io
const socketServer = new Server(httpServer);

// Configuramos los eventos de conexión y desconexión de los clientes
socketServer.on("connection", (socket) => {
  console.log("Cliente conectado");

  socket.emit("products", products);

  // recibimos los productos desde el cliente
  socket.on("products", (data) => {
    // enviamos los productos al cliente
    socket.emit("products", data);
  });
});
