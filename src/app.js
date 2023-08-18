// Importamos express
import express from "express";

// Importamos sockets io
import { Server } from "socket.io";

// Importamos handlebars
import handlebars from "express-handlebars";

import { __dirname } from "./utils.js";
import { routerProducts } from "./routes/products.routes.js";
import { routerCarts } from "./routes/carts.routes.js";
import { routerViews } from "./routes/views.router.js";

// Almacenamos el puerto en una constante
const PORT = 8080;

// Almacenamos express ejecutado en la constante app
const app = express();

// Implementamos handlebars
app.engine("handlebars", handlebars.engine());
app.set("views", "views");
app.set("view engine", "handlebars");

// Asignamos la carpeta donde van a estar los contenidos públicos
app.use(express.static("/public"));

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
