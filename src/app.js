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
import { messageManager } from "./dao/managers/mongoDBManagers/message.manager.js";

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



// Configuramos el servidor de socket io
const socketServer = new Server(httpServer);

// Configuramos los eventos de conexión y desconexión de los clientes
socketServer.on("connection", async (socket) => {
  console.log("Cliente conectado");
  const products = await productManagerDB.getAllProducts();
  socket.emit("products", products);

  const messages = await messageManager.getMessages();
  socket.emit("messages", messages);

  socket.on("new-product", async (data) => {
    await productManagerDB.addProduct(data);
    const products = await productManagerDB.getAllProducts();
    socket.emit("products", products);
  });
  
  socket.on("delete", async (id) => {
    await productManagerDB.deleteProduct(id);
    const products = await productManagerDB.getAllProducts();
    socket.emit("products", products);
  }
  );

  socket.on("chatMessage", async (data) => {
    await messageManager.saveMessage(data);
    const messages = await messageManager.getMessages();
    socketServer.emit("messages", messages);
  });

  
});
